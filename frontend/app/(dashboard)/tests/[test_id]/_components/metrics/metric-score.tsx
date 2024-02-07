import { Separator } from "@/components/ui/new-york/ui/separator";

interface Props {
  value: number;
  lower_threshold?: number;
  upper_threshold?: number;
  failed: boolean;
}

export default function MetricScoreDisplay(props: Props) {
  // get the color of the text based on the failed status
  let text_color = props.failed ? "text-validaitorRed" : "text-validaitorTurquoise";

  return (
    <div className="flex-col flex-shrink justify-center gap-4 max-w-xl">
      <div className={"text-5xl font-bold text-center mb-4 " + text_color}>
        {props.value.toFixed(2)}
      </div>
      <div className="flex gap-4 justify-center">
        <div className="text-gray-500 dark:text-gray-400">
          <div className="font-semibold">Lower Threshold</div>
          <div className="text-sm text-center">
            {props.lower_threshold?.toFixed(2)}
          </div>
        </div>
        <Separator className="h-6" orientation="vertical" />
        <div className="text-gray-500 dark:text-gray-400">
          <div className="font-semibold">Upper Threshold</div>
          <div className="text-sm text-center">
            {props.upper_threshold?.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
