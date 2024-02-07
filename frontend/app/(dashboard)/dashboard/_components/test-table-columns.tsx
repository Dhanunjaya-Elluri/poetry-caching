'use client'

import { ColumnDef } from '@tanstack/react-table'
import {Badge} from '@/components/ui/badge';
import { ValidaitorTest } from '@/types/validaitorTests'
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { TestStatus } from '@/enum/test';


export const columnsTest: ColumnDef<ValidaitorTest>[] = [
  {
    accessorKey: "name",
    header: () => "Name"
  },
  {
    accessorKey: "category",
    header: () => "Category"
  },
  {
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => {
      let badgeVariant;
      let statusText: string = row.getValue('status');

      switch (statusText) {
        case TestStatus.PENDING:
          badgeVariant = 'bg-validaitorBlue';
          break;
        case TestStatus.RUNNING:
          badgeVariant = 'bg-validaitorOrange';
          break;
        case TestStatus.COMPLETED:
          badgeVariant = 'bg-validaitorTurquoise';
          break;
        case TestStatus.SUCCESS:
          badgeVariant = 'bg-validaitorTurquoise';
          break;
        case TestStatus.FAILED:
          badgeVariant = 'bg-validaitorRed';
          break;
        case TestStatus.ERROR:
          badgeVariant = 'bg-validaitorRed';
          break;
        default:
          badgeVariant = 'secondary';
      }

      return <Badge className={badgeVariant}>{statusText}</Badge>;
    },
  },
  {
    accessorKey: "config.llm_api_name",
    header: () => "API"
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const formatted = moment(row.getValue('created_at')).fromNow();
      return formatted;
    },
  }

]
