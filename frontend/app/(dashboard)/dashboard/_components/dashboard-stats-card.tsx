import React from 'react';
import { ValidaitorTest } from '@/types/validaitorTests';
import { Bot, FolderKanban, ShieldCheck } from 'lucide-react';
import { LLMApi } from '@/types/llmApi';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import Link from "next/link"
import { Project } from '@/types/project';
import { TestStatus } from '@/enum/test';

interface Props {
  data: LLMApi[] | ValidaitorTest[] | Project[];
  name: string;
}

const DashboardStatsCard: React.FC<Props> = ({ data, name }: Props) => {
  interface Stats {
    today: number;
    improvement: number;
  }

  const calculateItemsByDate = (items: any[], dateToCheck: Date): Stats => {
    const today = new Date(dateToCheck);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    let todayCount = 0;
    let yesterdayCount = 0;

    items.forEach(item => {
      const createdAtDate = item.created_at ? new Date(item.created_at) : new Date();
      const createdAt = {
        day: createdAtDate.getDate(),
        month: createdAtDate.getMonth(),
        year: createdAtDate.getFullYear(),
      };

      if (
        createdAt.day === today.getDate() &&
        createdAt.month === today.getMonth() &&
        createdAt.year === today.getFullYear()
      ) {
        todayCount++;
      } else if (
        createdAt.day === yesterday.getDate() &&
        createdAt.month === yesterday.getMonth() &&
        createdAt.year === yesterday.getFullYear()
      ) {
        yesterdayCount++;
      }
    });

    const improvement = todayCount - yesterdayCount;

    return {
      today: todayCount,
      improvement,
    };
  };

  // Usage for 'apis'
  const dataStats = calculateItemsByDate(data, new Date());

  const getRunningTestCount = (): number => {
    if (name.toLowerCase() === 'tests') {
      const validatorTests = data.filter(
        (item): item is ValidaitorTest => 'status' in item
      );
      const runningTests = validatorTests.filter(test => test.status === TestStatus.RUNNING );
      return runningTests.length;
    }
    return 0;
  };

  const runningTestCount = getRunningTestCount();

  return (
      <div>
      <Card>
        <CardContent className='ml-1 mr-1'>
        <div className="grid grid-cols-3">
          <div className="col-span-2">
          <div style={{ marginBottom: '30px' }}>
          <Link href={`/${name.toLowerCase()}`}>
              <Typography color="text.secondary" variant="inherit">
              {name}
              </Typography>
          </Link>
          </div>
            <span>
            <div className="grid grid-cols-3">
            <div className="col-span-2">
              <div className="text-2xl font-bold">{data ? data.length : 0}</div>
              <p className="text-xs text-muted-foreground">Total {name}</p>
            </div>
            <div>
            {name.toLowerCase() === 'tests' ? (
              <div>
              <div className="text-2xl font-bold">{runningTestCount}</div>
              <p className="text-xs text-muted-foreground">Running Tests</p>
              </div>
            ) : (
              <div>
              <div className="text-2xl font-bold">{dataStats.today}</div>
              <p className="text-xs text-muted-foreground">Created Today</p>
              </div>
            )}
            </div>
            <div></div>
          </div>
            </span>
          </div>
          <div className="grid justify-items-end">
          <Avatar className='rounded'
              sx={{
                backgroundColor: '#b8d7ed',
                height: 60,
                width: 60,
                borderRadius: 6
              }} variant="square"
            >
              {name.toLowerCase() === 'apis' ? (
                <Bot size={40} />
              ) : name.toLowerCase() === 'projects' ? (
                <FolderKanban size={38} />
              ) : (
                <ShieldCheck size={39} />
              )}
            </Avatar>
          </div>
        </div>
        </CardContent>
      </Card>
      </div>
  );
};

export default DashboardStatsCard;
