import { ValidaitorMetricResult } from "@/types/metrics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DefaultMetricResult from "./default-metric-result";
import { Separator } from "@/components/ui/new-york/ui/separator";
import { ValidaitorMetrics } from "@/enum/metrics";
import DefaultFairnessMetricResult from "./default-fairness-metric-result";

interface props {
  result: ValidaitorMetricResult;
}

export default function MetricCard({ result }: props) {
  let metric_name = result.metric_config.name;

  const metric_result = () => {
    switch (result.metric_config.name) {
      case ValidaitorMetrics.DEMOGRAPHIC_PARITY:
        return DefaultFairnessMetricResult({ result: result });

      default:
        return DefaultMetricResult({ result: result });
    }
  };

  return (
    <Card className="flex flex-col flex-grow">
      <CardHeader>
        <CardTitle>{result.metric_config.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between grow">
        {metric_result()}
        <div>
          <Separator className="mt-4" />
          <CardDescription className="mt-2">
            {result.metric_config.description}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}
