"use client";

import { Avatar, Card, CardContent, Typography, } from '@mui/material';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { useParams } from "next/navigation";
import { useRetrieveApiDashboardQuery, useRetrieveApiProvidersQuery, useRetrieveApisQuery } from "@/redux/llmApi/apiSlice";
import { ClipboardIcon, LayoutList } from "lucide-react";
import CopyShortenedLink from "@/components/common/shortened-url";

export default function DashboardPage() {
  const { api_id } = useParams<{ api_id: string }>(); // Update the type of project_id
  const { data: apiArray = [] } = useRetrieveApisQuery({'api': api_id});
  const { data: apiDashboardArray = [] } = useRetrieveApiDashboardQuery(api_id);
  const api = apiArray ? apiArray[0] : null;
  const {data: apiProviderArray = []} = useRetrieveApiProvidersQuery({'api_provider': api?.llm_api_provider});
  const apiProvider = apiProviderArray[0];
  console.log(apiProvider);

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight"> API Dashboard</h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">
                Analytics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className='ml-1 mr-1'>
                <div className="grid grid-cols-3">
                  <div className="col-span-2">
                  <div style={{ marginBottom: '25px' }}>
                      <Typography color="text.secondary" variant="inherit">
                      Details
                      </Typography>
                  </div>
                    <span>
                    <div className="grid grid-cols-2">
                    <div className="col-span-1">
                      <div className="text-xl">{api?.name}</div>
                      <p className="text-xs text-muted-foreground">Name</p>
                    </div>
                    <div className="col-span-1">
                      <div className="text-xl">{api?.project_name}</div>
                      <p className="text-xs text-muted-foreground">Organization</p>
                    </div>

                  </div>
                    </span>
                  </div>
                  <div className="grid justify-items-end">
                  <Avatar
                      sx={{
                        backgroundColor: '#b8d7ed',
                        height: 60,
                        width: 60,
                        borderRadius: 6
                      }} variant="square"
                    >
                      <LayoutList size={38} />
                    </Avatar>

                  </div>
                </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='ml-1 mr-1'>
                <div className="grid grid-cols-3">
                  <div className="col-span-2">
                  <div style={{ marginBottom: '25px' }}>
                      <Typography color="text.secondary" variant="inherit">
                       Provider
                      </Typography>
                  </div>
                    <span>
                    <div className="grid grid-cols-2">
                    <div className="col-span-2">
                      <div className="text-xl">{apiProvider?.name}</div>
                      <p className="text-xs text-muted-foreground">Name</p>
                    </div>

                  </div>
                    </span>
                  </div>
                  <div className="grid justify-items-end">
                  <Avatar
                      sx={{
                        backgroundColor: '#b8d7ed',
                        height: 60,
                        width: 60,
                        borderRadius: 6
                      }} variant="square"
                    >
                      <LayoutList size={38} />
                    </Avatar>

                  </div>
                </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='ml-1 mr-1'>
                <div className="grid grid-cols-3">
                  <div className="col-span-2">
                    <div style={{ marginBottom: '25px' }}>
                        <Typography color="text.secondary" variant="inherit">
                        URL
                        </Typography>
                    </div>
                    <div className="grid">
                    <div className="col-span-1 mt-2">
                      <CopyShortenedLink link={api?.api_url ?? ''} displayLength={30}/>
                    </div>
                    </div>
                  </div>
                  <div className="grid justify-items-end">
                  <Avatar
                      sx={{
                        backgroundColor: '#b8d7ed',
                        height: 60,
                        width: 60,
                        borderRadius: 6
                      }} variant="square"
                    >
                      <LayoutList size={38} />
                    </Avatar>

                  </div>
                </div>
                </CardContent>
              </Card>

              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
