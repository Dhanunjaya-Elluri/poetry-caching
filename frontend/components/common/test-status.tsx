import React from 'react';

import { Badge } from '@/components/ui/badge';
import { TestStatus } from '@/enum/test';
import { Progress } from '@/components/ui/progress';

interface Props {
  status?: string;
  progressInfo?: {
    current: number;
    total: number;
  };
}

const TestStatusBadge = ({ status, progressInfo }: Props) => {
  switch (status) {
    case TestStatus.PENDING:
      return <Badge className="bg-validaitorBlue">{status}</Badge>;
    case TestStatus.RUNNING:
      return (
        <Progress
          value={progressInfo?.current}
          max={progressInfo?.total}
          className="mr-1"
        />
      );
    case TestStatus.COMPLETED:
      return (
        <Badge className="bg-validaitorTurquoise">{status}</Badge>
      );
    case TestStatus.ERROR:
      return <Badge className="bg-validaitorRed">{status}</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default TestStatusBadge;
