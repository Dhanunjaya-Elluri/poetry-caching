import { ValidaitorTest } from "@/types/validaitorTests";

import { ValidaitorMetricResult } from "@/types/metrics";
import TestStatusBadge from "@/components/common/test-status";
import GaugeChart from "./percentage-gauge-chart";
import IconCard from "@/app/(dashboard)/_components/icon-card";
import { BarChart3, Bot } from "lucide-react";
import StatsCardValue from "@/app/(dashboard)/_components/stat-card-value";
import { Settings } from "lucide-react";
import { LLMApi } from "@/types/llmApi";
import { useRetrieveApiQuery } from "@/redux/llmApi/apiSlice";
import { CloudCog } from "lucide-react";
import { useRetrieveCollectionQuery } from "@/redux/collections/apiSlice";
import { Boxes } from "lucide-react";
import Link from "next/link";
import { MessagesSquare, Tag } from "lucide-react";
import { useRetrieveTestPromptSummaryQuery } from "@/redux/validaitor_tests/apiSlice";

interface Props {
  test: ValidaitorTest | undefined;
  metric_results?: ValidaitorMetricResult[];
}

export default function TestOverViewCards(props: Props) {
  // load api data
  const {
    data: api,
    isError: isApiError,
    isLoading: isApiLoading,
  } = useRetrieveApiQuery(props.test!.config.llm_api, {
    skip: !props.test?.id,
  });

  const {
    data: promptSummary,
    isError: isPromptSummaryError,
    isLoading: isPromptSummaryLoading,
  } = useRetrieveTestPromptSummaryQuery(props.test!.id!);

  console.log("prompt summary", promptSummary);

  const {
    data: collection,
    isError: isCollectionError,
    isLoading: isCollectionLoading,
  } = useRetrieveCollectionQuery(props.test!.config.prompt_collection, {
    skip: !props.test?.id,
  });

  let num_failed = 0;
  // get failure percentage from metric results
  if (props.metric_results) {
    num_failed = props.metric_results.filter((metric) => metric.failed).length;
  }

  console.log("test", props.test);

  const failure_percentage = (num_failed / props.metric_results!.length) * 100;

  let test_failed = false;
  // failure status - if any metric failed, the test failed
  if (props.metric_results) {
    test_failed = props.metric_results.some((metric) => metric.failed);
  }

  let status_color = "bg-green-500";

  if (!props.test) {
    return <div>Loading...</div>;
  }

  let testConfigValues = {
    apiName: api?.name,
    apiId: api?.id,
    providerName: api?.provider_name,
    providerId: api?.llm_api_provider,
    collectionName: collection?.name,
    collectionId: collection?.id,
  };

  function formatTokens(value: Number | undefined): string {
    // divide by 1000 and round to 2 decimals

    if (!value) {
      return "";
    }
    let tokens = ((value as number) / 1000).toFixed(1);

    return `${tokens}K`;
  }

  // define the icons for the differen cards (need to be react components)
  const icons = {
    score: <BarChart3 size={48} className="text-gray-500" />,
    config: <Settings size={48} className="text-gray-500" />,
    message: <MessagesSquare size={48} className="text-gray-500" />,
    bot: <Bot size={28} className="text-gray-500" />,
    cloudCog: <CloudCog size={24} className="text-gray-500" />,
    boxes: <Boxes size={24} className="text-gray-500" />,
    tag: <Tag size={24} className="text-gray-500" />,
  };

  return (
    <div className="flex grow">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 grow">
        <IconCard title="Score" icon={icons.score}>
          <div className="flex row h-16 justify-between">
            <div className="flex-col col-4">
              <div className="relative">
                <div className="absolute left-0 h-8 w-32">
                  <GaugeChart percentage={failure_percentage} />
                </div>
              </div>
            </div>
            <div className="flex row space-x-4 justify-between">
              <div className="flex-col">
                <StatsCardValue
                  value={props.metric_results!.length}
                  title="Total Metrics"
                  valueColor="text-black"
                />
              </div>
              <div className="flex-col">
                <StatsCardValue
                  value={num_failed}
                  title="Failed Metrics"
                  valueColor="text-black"
                />
              </div>
            </div>
          </div>
        </IconCard>
        <IconCard title="Config" icon={icons.config}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex row space-x-2">
              {icons.tag}
              <p>{props.test.category}</p>
            </div>
            <div className="flex row space-x-2">
              {icons.bot}
              <Link
                href={`/apis/${testConfigValues.apiId}`}
                className="hover:text-validaitorBlue"
              >
                {testConfigValues.apiName}
              </Link>
            </div>
            <div className="flex row space-x-2">
              {icons.cloudCog}
              <Link
                href={`/api-providers/${testConfigValues.providerId}`}
                className="hover:text-validaitorBlue"
              >
                {testConfigValues.providerName}
              </Link>
            </div>
            <div className="flex row space-x-2">
              {icons.boxes}
              <Link
                href={`/collections/${testConfigValues.collectionId}`}
                className="hover:text-validaitorBlue"
              >
                {testConfigValues.collectionName}
              </Link>
            </div>
          </div>
        </IconCard>
        <IconCard title="Prompts" icon={icons.message}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <StatsCardValue
              value={promptSummary?.num_prompts}
              title="Total Prompts"
              valueColor="text-black"
            />
            <StatsCardValue
              value={formatTokens(promptSummary?.num_tokens)}
              title="Tokens"
              valueColor="text-black"
            />
            <StatsCardValue
              value={`${promptSummary?.cost.toFixed(2)}$`}
              title="Cost"
              valueColor="text-black"
            />
          </div>
        </IconCard>
      </div>
    </div>
  );
}
