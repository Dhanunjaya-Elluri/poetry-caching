import { ValidaitorMetricResult } from "@/types/metrics";
import classNames from "classnames";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
interface Props {
  result: ValidaitorMetricResult;
  className?: string;
}

export default function FairnessMetricBarChart({ result, className }: Props) {
  // extract the relevant information from the configuration
  let lower_threshold = result.metric_config.lower_threshold;
  let upper_threshold = result.metric_config.upper_threshold;
  let config = result.metric_config.config;
  let sensitiveGroups = config.sensitive_groups as string[];
  console.log("sensitive groups", sensitiveGroups);
  let result_data = result.result;
  console.log("result data", result_data);

  // for each of the sensitive groups get the data from the result
  let data = sensitiveGroups.map((group) => ({
    name: group,
    value: result_data[group].value,
    fill: result_data[group].failed ? "#931F1D" : "#2CDA9D",  // validaitor green or red
  }));
  console.log(data); // Replace Math.random() with actual data

  return (
    <div className={"flex flex-col justify-center self-center" + className}>
      <div className="self-center">
        <BarChart
          width={400}
          height={200}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="value" fill="#8884d8" />
          <ReferenceLine y={lower_threshold} stroke="#931F1D" />
          <ReferenceLine y={upper_threshold} stroke="#931F1D" />
        </BarChart>
      </div>

      <div className="self-center">
        {/* display threshold values */}
        <div className="flex items-center gap-4">
          <div className="text-gray-500 dark:text-gray-400">
            <div className="font-semibold">Lower Threshold</div>
            <div className="text-sm text-center">
              {lower_threshold!.toFixed(2)}
            </div>
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            <div className="font-semibold">Upper Threshold</div>
            <div className="text-sm text-center">
              {upper_threshold!.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
