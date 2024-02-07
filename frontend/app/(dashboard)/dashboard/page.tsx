'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DashboardStatsCard from "./_components/dashboard-stats-card";
import { useRetrieveApisQuery } from "@/redux/llmApi/apiSlice";
import { useRetrieveTestsQuery } from "@/redux/validaitor_tests/apiSlice";
import { BarChartBox } from "./_components/test-overview";
import { PieChartBox } from "./_components/pie-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "./_components/data-table";
import { columnsLLMApi } from "./_components/llm-table-columns";
import { columnsTest } from "./_components/test-table-columns";
import { Typography } from "@mui/material";
import Link from "next/link";
import { InvitationBanner } from "../_components/invitation-banner";
import { useEffect, useState } from "react";
import { useCheckUserOrganizationInvitationsQuery } from "@/redux/organizations/invitations/apiSlice";
import { useRetrieveProjectsQuery } from "@/redux/projects/apiSlice";
import { TestStatus } from "@/enum/test";

export default function DashboardPage() {
  const { data: apis = [] } = useRetrieveApisQuery({});
  const { data: tests = [] } = useRetrieveTestsQuery({});
  const { data: projects = [] } = useRetrieveProjectsQuery();
  const { data: invitation = {}, refetch: refetchInvitations } = useCheckUserOrganizationInvitationsQuery({});
  const [isInvitation, setIsInvitation] = useState(false);


  useEffect(() => {
    setIsInvitation(invitation.message === "True");
  }, [invitation]);
  return (
    <>
    <div>
        <InvitationBanner invitation={invitation} isInvitation={isInvitation} setIsInvitation={setIsInvitation} refetchInvitations={refetchInvitations}/>
    </div>
    <div className="flex-col md:flex p-10">
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <DashboardStatsCard data={projects} name="Projects"/>
            <DashboardStatsCard data={apis} name="Apis" />
            <DashboardStatsCard data={tests} name="Tests"/>
            </div>
          </div>
          <div className="grid xl:gap-6 lg:grid-cols-2 xl:grid-cols-9">
                <Card className="col-span-3 lg:mb-4 xl:mb-0 sm:mb-4">
                  <CardHeader>
                    <CardTitle className="text-xl">Test Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {tests?.length == 0 || tests === undefined ? (
                      <div className="flex flex-col relative w-full p-20 text-center">
                      <Typography color="text.secondary" variant="h6">
                        No Test configured yet.
                      </Typography >
                      </div>
                    ) : (
                    <Tabs defaultValue="Completed" >
                      <TabsList className="bg-gray-50 grid w-full grid-flow-col auto-cols-max justify-evenly">
                        <TabsTrigger value="Completed" className="text-validaitorBlue">Completed</TabsTrigger>
                        <TabsTrigger value="Pending" className="text-validaitorBlue">Pending</TabsTrigger>
                        <TabsTrigger value="Failed" className="text-validaitorBlue">Failed</TabsTrigger>
                        <TabsTrigger value="Running" className="text-validaitorBlue">Running</TabsTrigger>
                        <TabsTrigger value="Error" className="text-validaitorBlue">Error</TabsTrigger>
                      </TabsList>
                      <TabsContent value="Completed" className="justify-center">
                      <BarChartBox data={tests.filter(item => item.status === TestStatus.COMPLETED)}/>
                      </TabsContent>
                      <TabsContent value="Pending">
                        <BarChartBox data={tests.filter(item => item.status === TestStatus.PENDING)}/>
                      </TabsContent>
                      <TabsContent value="Failed">
                        <BarChartBox data={tests.filter(item => item.status === TestStatus.FAILED)}/>
                      </TabsContent>
                      <TabsContent value="Running">
                        <BarChartBox data={tests.filter(item => item.status === TestStatus.RUNNING)}/>
                      </TabsContent>
                      <TabsContent value="Error">
                        <BarChartBox data={tests.filter(item => item.status === TestStatus.ERROR)}/>
                      </TabsContent>
                    </Tabs>
                    )}
                  </CardContent>
                </Card>
                <Card className="col-span-6">
                  <CardHeader>
                  <Link href={"/tests"}>
                  <CardTitle className="text-xl">Latest Tests</CardTitle>
                  </Link>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center">
                      {tests?.length == 0 || tests === undefined ? (
                        <div className="flex flex-col relative w-full p-20 text-center">
                        <Typography color="text.secondary" variant="h6">
                        No Test configured yet.
                        </Typography >
                        </div>
                      ) : (
                        <DataTable data={tests} columns={columnsTest} />
                      )}
                    </div>
                  </CardContent>
                </Card>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-9">
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle className="text-xl">API Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                  {apis?.length == 0 || apis === undefined ? (
                      <div className="flex flex-col relative w-full p-20 text-center">
                      <Typography color="text.secondary" variant="h6">
                      No API configured yet.
                      </Typography >
                      </div>
                    ) : (
                      <PieChartBox data={apis}/>
                    )}
                  </CardContent>
                </Card>
                <Card className="col-span-6">
                  <CardHeader>
                  <Link href={"/apis"}>
                    <CardTitle className="text-xl">Latest APIs</CardTitle>
                  </Link>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col">
                    {apis?.length == 0 || apis === undefined ? (
                     <div className="flex flex-col relative w-full p-20 text-center
                    ">
                        <Typography color="text.secondary" variant="h6">
                        No API configured yet.
                        </Typography >
                   </div>
                    ) : (
                      <DataTable data={apis} columns={columnsLLMApi} />
                    )}
                    </div>
                  </CardContent>
                </Card>
          </div>
        </div>
     </div>
    </>
  )
}
