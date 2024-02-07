"use client";

import {
  useRetrieveTestResultsQuery,
  useRetrieveTestQuery,
} from "@/redux/validaitor_tests/apiSlice";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import TestOverViewCards from "../_components/test-overview-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetricCard from "../_components/metrics/metric-card";
import PromptResponseTable from "../prompts/_components/prompt-response-table";
import { Tally5, MessagesSquare, BarChart3 } from "lucide-react";
import TestStatusBadge from "@/components/common/test-status";
import { Badge } from "@/components/ui/badge";
import { useRetrieveApiQuery } from "@/redux/llmApi/apiSlice";
import { useEffect } from "react";

export default function App() {
  const searchParams = useParams();
  const test_id = Number(searchParams.test_id);

  const {
    data: test,
    isError: isTestError,
    isLoading: isTestLoading,
  } = useRetrieveTestQuery(test_id);

  console.log("test", test)

  const {
    data: results,
    isError,
    isLoading,
  } = useRetrieveTestResultsQuery(test_id);

  // Loading state

  // Dependent query, skipped until the first one is successful
  // assuming the initialData has a property `someId` we need

  if (!isTestLoading && !isTestError && !test) {
    return notFound();
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Error or no results
  else if (isError || (!isLoading && !results)) {
    return notFound();
  }

  return (
    <div className="overflow-auto flex flex-col p-8 space-y-4">
      <h1 className="text-4xl">
        {test?.name} <TestStatusBadge status={test?.status} />
      </h1>
      <TestOverViewCards test={test} metric_results={results!} />
      <div>
        <Tabs defaultValue="results" className="space-y-4">
          <TabsList>
            <TabsTrigger value="results">
              <BarChart3 className="mr-2" /> Results
            </TabsTrigger>
            <TabsTrigger value="prompts">
              <MessagesSquare className="mr-2" /> Prompts
            </TabsTrigger>
          </TabsList>
          <div className="px-1 mt-4">
            <TabsContent value="results">
              <div className="grid grid-cols-2 gap-4">
                {results!.map((result) => (
                  <MetricCard result={result} key={result.id} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="prompts">
              <PromptResponseTable test_id={test_id} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
