import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Mail, MapPin } from 'lucide-react';


interface Props {
    organization_information :any;
    projectssCount:number;
    invitationsCount:number;
    organizationmembersCount: number;
    organizationmemberRolesCount: number;
    pendingCount: number;
  }

const OrganizationStatsCard = ({ organization_information, projectssCount, invitationsCount, organizationmembersCount, pendingCount, organizationmemberRolesCount }: Props) => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4 ">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Organization: {organization_information?.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <div className="max-w-2xl">
          <div className="font-bold flex items-center">
              <Mail size={15} />
              <div className="ml-2">
                  <p className="text-xs text-muted-foreground">{organization_information?.email}</p>
              </div>
          </div>

          <div className="font-bold mt-3 flex items-center">
              <MapPin size={15} />
              <div className="ml-2">
                  <p className="text-xs text-muted-foreground">{organization_information?.address}</p>
              </div>
          </div>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Projects
        </CardTitle>
      </CardHeader>
      <CardContent>
      <div className="col-span-2">
              <div className="text-2xl font-bold">{projectssCount ? projectssCount : 0}</div>
              <p className="text-xs text-muted-foreground">Total Projects</p>
            </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
        Organization Members
        </CardTitle>
      </CardHeader>
      <CardContent>
      <div className="grid grid-cols-3">
            <div className="col-span-2">
              <div className="text-2xl font-bold">{organizationmembersCount ? organizationmembersCount : 0}</div>
              <p className="text-xs text-muted-foreground">Total Members</p>
            </div>
            <div>
              <div className="text-2xl font-bold">{organizationmemberRolesCount ? organizationmemberRolesCount : 0}</div>
              <p className="text-xs text-muted-foreground">Different Roles</p>
            </div>
            <div></div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Invitations
        </CardTitle>
      </CardHeader>
      <CardContent>
      <div className="grid grid-cols-3">
            <div className="col-span-2">
              <div className="text-2xl font-bold">{invitationsCount ? invitationsCount : 0}</div>
              <p className="text-xs text-muted-foreground">Total Invitations</p>
            </div>
            <div>
              <div className="text-2xl font-bold">{pendingCount ? pendingCount : 0}</div>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
            <div></div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default OrganizationStatsCard;
