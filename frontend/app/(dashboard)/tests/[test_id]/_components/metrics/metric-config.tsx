import { Badge } from "@/components/ui/badge";

interface Props {
  config: { [key: string]: any };
}

export default function DefaultMetricConfig({ config }: Props) {
  function formatConfigValue(value: any) {
    let value_type = typeof value;
    switch (value_type) {
      case 'number':
        return value.toFixed(2);
      case 'string':
        return value;
      case 'object':
        if (Array.isArray(value)) {
          // Render each array element as a badge
          return value.map((item) => (
            <Badge key={item} className="bg-validaitorBlue mr-2 px-2.5 py-0.5">
              {item}
            </Badge>
          ));
        } else {
          return JSON.stringify(value);
        }
      default:
        return value;
    }
  }
  console.log("config", config )
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="flex-col">
          <div className="flex flex-row justify-between">
            <div className="flex-col">
              <p className="text-2xl mb-2">Configuration:</p>
              {Object.entries(config).map(([key, value]) => (
                <div key={key} className="flex flex-row mb-4">
                  <p className="font-semibold">
                    {key.replace('_', ' ')}:
                  </p>
                  <div className="ml-2">
                    {formatConfigValue(value)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
