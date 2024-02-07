import { ValidaitorMetricResult } from "@/types/metrics";
import DefaultMetricConfig from "./metric-config";
import FairnessMetricBarChart from "./fairness-metric-bar-chart";

interface Props {
  result: ValidaitorMetricResult;
}

export default function DefaultFairnessMetricResult({ result }: Props) {
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
    <div className="flex flex-col-reverse justify-between 2xl:flex-row">
      <div className="flex-col mt-4 xl:mt-0">
        <DefaultMetricConfig config={config} />
      </div>
      <div className="flex-col justify-center">
        <div className="self-center">
          <FairnessMetricBarChart result={result} className="align-middle" />
        </div>
      </div>
    </div>
  );
}
