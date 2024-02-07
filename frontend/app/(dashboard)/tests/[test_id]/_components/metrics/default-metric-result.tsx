import { Separator } from "@/components/ui/new-york/ui/separator";
import { ValidaitorMetricResult } from "@/types/metrics";
import DefaultMetricConfig from "./metric-config";
import MetricScoreDisplay from "./metric-score";

const tailwindColors = require("../../../../../../tailwind.config").theme.extend
  .colors;

interface Props {
  result: ValidaitorMetricResult;
}

export default function DefaultMetricResult({ result }: Props) {
  // extract the relevant information from the configuration
  let lower_threshold = result.metric_config.lower_threshold;
  let upper_threshold = result.metric_config.upper_threshold;
  // TODO fix this annoying trick to get the numnber to display as float
  let metric_value: number = result.result["value"] + 0.0000000000001;
  let failed = result.result["failed"];
  let config = result.metric_config.config;

  // get the color of the text based on the failed status
  let text_color = failed ? "text-red-600" : "text-green-600";

  function formatConfigValue(value: any) {
    let value_type = typeof value;
    switch (value_type) {
      case "number":
        return value.toFixed(2);
      case "string":
        return value;
      case "object":
        return JSON.stringify(value);
      default:
        return value;
    }
  }

  return (
    <div className="flex flex-col-reverse justify-between xl:flex-row space-y-4">
      <div className="flex-col mt-4 xl:mt-0">
        <div className="flex flex-row justify-between">
          <div className="flex-col">
            <DefaultMetricConfig config={config} />
          </div>
        </div>

      </div>
      <MetricScoreDisplay value={metric_value} lower_threshold={lower_threshold} upper_threshold={upper_threshold} failed={failed} />
    </div>
  );
}
