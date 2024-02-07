'use client';

import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { ValidaitorTest } from '@/types/validaitorTests';
import { TestStatus } from '@/enum/test';

interface Props {
    data: ValidaitorTest[];
  }

const TestStatsCard = ({ data }: Props) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4 ">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Total
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {data ? data.length : 0}
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Completed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {data
            ? data.filter(
                (test) => test.status === TestStatus.COMPLETED
              ).length
            : 0}
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Failed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {data
            ? data.filter(
                (test) =>
                  test.status === TestStatus.ERROR
              ).length
            : 0}
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Pending
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {data
            ? data.filter(
                (test) => test.status === TestStatus.PENDING
              ).length
            : 0}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default TestStatsCard;
