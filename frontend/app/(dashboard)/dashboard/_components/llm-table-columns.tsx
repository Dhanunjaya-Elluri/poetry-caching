'use client'

import { ColumnDef } from '@tanstack/react-table'
import {Badge} from '@/components/ui/badge';
import { LLMApi } from '@/types/llmApi'
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from "lucide-react"
import CopyShortenedLink from "@/components/common/shortened-url";

export const columnsLLMApi: ColumnDef<LLMApi>[] = [
  {
    accessorKey: "name",
    header: () => "Name"
  },
  {
    accessorKey: "api_url",
    header: () => "URL",
    cell: ({ row }) => {
      return <CopyShortenedLink link={row.getValue('api_url') as string} displayLength={30} />
    },
  },
  {
    accessorKey: "provider_name",
    header: () => <div className="text-left">Provider</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => {
      return <Badge variant="secondary">UP</Badge>
    },
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
