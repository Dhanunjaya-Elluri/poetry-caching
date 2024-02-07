"use client";
import Image from "next/image"

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function DashboardPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className='md:col-span-2 md:row-span-2'>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Overall Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">57</div>
                    <p className="text-xs text-muted-foreground">
                        +2.4 from last api tested
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Criticsl Issues
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">
                        +2 from last api tested
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Number of running tests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7</div>
                    <p className="text-xs text-muted-foreground">
                        -1 from last api tested
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Interactive analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">57</div>
                    <p className="text-xs text-muted-foreground">

                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Create a new test
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button variant="destructive" className="w-full">
                        Click here
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
                <Card className="col-span-12">
                  <CardHeader>
                    <CardTitle>Benchmarks</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                  <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead className="w-[150px]">Name</TableHead>
                                <TableHead className="w-[150px]">URL</TableHead>
                                <TableHead className="w-[100px]">Provider</TableHead>
                                <TableHead className="w-[50px]">Status</TableHead>
                                <TableHead className="w-[150px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>1</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>1</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                  </CardContent>
                </Card>
              </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
                <Card className="col-span-12">
                  <CardHeader>
                    <CardTitle>Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead className="w-[150px]">Name</TableHead>
                                <TableHead className="w-[150px]">URL</TableHead>
                                <TableHead className="w-[100px]">Provider</TableHead>
                                <TableHead className="w-[50px]">Status</TableHead>
                                <TableHead className="w-[150px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>1</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>1</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
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
