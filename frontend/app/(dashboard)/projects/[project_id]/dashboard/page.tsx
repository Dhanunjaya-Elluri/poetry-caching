"use client";
import ApiList from "@/app/(dashboard)/apis/_components/api-list";
import TestList from "@/app/(dashboard)/tests/_components/test-list";
import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRetrieveApisQuery } from "@/redux/llmApi/apiSlice";
import { useRetrieveTestsQuery } from "@/redux/validaitor_tests/apiSlice";
import { useRetrieveProjectQuery } from "@/redux/projects/apiSlice";
import { useParams } from "next/navigation";
import DashboardStatsCard from "@/app/(dashboard)/dashboard/_components/dashboard-stats-card";
import { LayoutList } from "lucide-react";

export default function ProjectDashboardPage() {
  const { project_id } = useParams<{ project_id: string }>(); // Update the type of project_id
  const { data: project } = useRetrieveProjectQuery(project_id);
  const { data: apis = [] } = useRetrieveApisQuery({ project: project_id });
  const { data: tests = [] } = useRetrieveTestsQuery({ project: project_id });
  /* trim apis and tests to 5 */
  const trim_apis = apis.slice(0, 5);
  const trim_tests = tests.slice(0, 5);

  return (
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Project Dashboard
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1">
          <Card>
            <CardContent className="ml-1 mr-1">
              <div className="grid grid-cols-3">
                <div className="col-span-2">
                  <div style={{ marginBottom: "25px" }}>
                    <Typography color="text.secondary" variant="inherit">
                      Details
                    </Typography>
                  </div>
                  <span>
                    <div className="grid grid-cols-2">
                      <div className="col-span-1">
                        <div className="text-xl">{project?.name}</div>
                        <p className="text-xs text-muted-foreground">Name</p>
                      </div>
                      <div className="col-span-1">
                        <div className="text-xl">
                          {project?.organization_name}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Organization
                        </p>
                      </div>
                    </div>
                  </span>
                </div>
                <div className="grid justify-items-end">
                  <Avatar
                    sx={{
                      backgroundColor: "#b8d7ed",
                      height: 60,
                      width: 60,
                      borderRadius: 6,
                    }}
                    variant="square"
                  >
                    <LayoutList size={38} />
                  </Avatar>
                </div>
              </div>
            </CardContent>
          </Card>

          <DashboardStatsCard data={apis} name="APIs" />
          <DashboardStatsCard data={tests} name="Tests" />
        </div>
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1 sm:grid-cols-1">
          <Tabs defaultValue="tests">
            <TabsList>
              <TabsTrigger className="text-blue-500" value="tests">
                Tests
              </TabsTrigger>
              <TabsTrigger className="text-blue-500" value="apis">
                APIs
              </TabsTrigger>
            </TabsList>
            <TabsContent value="apis" className="space-y-4">
              <ApiList data={trim_apis} />
            </TabsContent>
            <TabsContent value="tests" className="space-y-4">
              <TestList data={trim_tests} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
