'use client';

import { useRetrieveLLMApiProviderQuery } from "@/redux/llmApiProvider/apiSlice";
import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import moment from 'moment';


export default function Component() {
  const { provider_id } = useParams<{ provider_id: string }>();
  const {data} = useRetrieveLLMApiProviderQuery(provider_id);

  return (
    <div className="w-full flex flex-col bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Provider Dashboard</h1>
      </div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-5 ">
      <Card className="md:col-span-1 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Provider Name
          </CardTitle>
        </CardHeader>
        <CardContent>
        <div className="col-span-1">
                <div className="text-s font-bold">{data?.name}</div>
              </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-1 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Project
          </CardTitle>
        </CardHeader>
        <CardContent>
        <div className="col-span-1">
                <div className="text-s font-bold">{data?.project_name}</div>
              </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-3 lg:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
          Metadatas
          </CardTitle>
        </CardHeader>
        <CardContent>
        <div className="grid grid-cols-4">
              <div className="col-span-1">
                <div className="text-s font-bold">{moment(data?.created_at).fromNow()}</div>
                <p className="text-xs text-muted-foreground">Created At</p>
              </div>
              <div className="col-span-1">
              <div className="text-s font-bold">{moment(data?.updated_at).fromNow()}</div>
                <p className="text-xs text-muted-foreground">Updated At</p>
              </div>
              <div className="col-span-2">
                <div className="text-s font-bold">{data?.created_by}</div>
                  <p className="text-xs text-muted-foreground">Created By</p>
              </div>
          </div>
        </CardContent>
      </Card>
  </div>
      <div className="flex justify-between items-center mb-8">
        <Tabs defaultValue="client_configuration" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="client_configuration">Client Configuration</TabsTrigger>
            <TabsTrigger value="request_template">Request Template</TabsTrigger>
            <TabsTrigger value="response_template">Response Template</TabsTrigger>
          </TabsList>
          <TabsContent value="client_configuration"></TabsContent>
          <TabsContent value="request_template"></TabsContent>
          <TabsContent value="response_template"></TabsContent>
        </Tabs>

      </div>
    </div>
  );
}
