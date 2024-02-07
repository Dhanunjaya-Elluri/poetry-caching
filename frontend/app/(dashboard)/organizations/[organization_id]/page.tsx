"use client";

import {
  Card,
  CardContent,

  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useRetrieveUserOrganizationsQuery } from "@/redux/organizations/detail/apiSlice";
import { useRetrieveUserOrganizationInvitationsQuery } from "@/redux/organizations/invitations/apiSlice";
import { useRetrieveUserGroupsQuery } from "@/redux/organizations/groups/apiSlice";
import OrganizationMembersList from "./_components/organization-members-list";
import OrganizationInvitationList from "./_components/organizations-invitations-list";
import { useRetrieveProjectsQuery } from '@/redux/projects/apiSlice';
import OrganizationStatsCard from './_components/organization-stats-card';
import { Button } from '@/components/ui/button';
import CreateInvitationSheet from '../_components/create-invitation-sheet';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Groups } from '@/enum/groups';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function OrganizationDetails({ params }: { params: { organization_id: number } }) {
  const { organization_id } = params;

  const user = useSelector((state: RootState) => state.auth.user);
  const { data: organizationmembers = [] } = useRetrieveUserOrganizationsQuery({organization_id:organization_id});
  const { data: organizationmembergroups = [], refetch: refetchUserGroups } = useRetrieveUserGroupsQuery(organization_id);
  const { data: invitations = [], refetch: refetchInvitations } = useRetrieveUserOrganizationInvitationsQuery({
    organization_id: organization_id });
  const { data: projects = [] } = useRetrieveProjectsQuery({ organization_id: organization_id });
  const organizationmembersCount = organizationmembers.length;
  const invitationsCount = invitations.length;
  const projectssCount = projects.length;
  const organization_information = organizationmembers[0]?.organization;

  const [childData, setChildData] = useState('');
    function handleChildData(data: string) {
        if (data === '') return;
        if (data === 'success') {
          setChildData(data);
          refetchInvitations();
          return;
        } else {
          setChildData(data);
          return;
        }
    }
    const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isAdmin = user?.is_superuser || (user?.groups.some(group => group.name === Groups.ORGANIZATION_ADMIN || group.name === Groups.PLATFORM_ADMIN)) || false;

  return (
    <div className="flex-col md:flex  min-h-screen bg-gray-100">
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="mb-5">
        <OrganizationStatsCard
          organization_information={organization_information}
          projectssCount={projectssCount}
          invitationsCount={invitationsCount}
          organizationmembersCount={organizationmembersCount}
          organizationmemberRolesCount={organizationmembergroups.length}
          pendingCount={invitations.filter(invitation => invitation.status === 'Pending').length} />
      </div>
      <div>
      <div className="flex justify-end items-center mb-8">
         </div>
          </div>
          <div>
          <Tabs defaultValue="members" className="space-y-2">
            <TabsList className="flex items-center">
              <TabsTrigger value="members">Organization Members</TabsTrigger>
              <TabsTrigger value="invitations">Invitations</TabsTrigger>
              <div className="ml-auto">

              {isAdmin ?
                <Button
                  variant="default"
                  size={'sm'}
                  onClick={() => setIsSheetOpen(true)}
                >
                  <UserPlus size={18} />
                  <span className="ml-2"><i className='fas fa-user-plus'></i>Add Member</span>
                </Button> : null}
              <CreateInvitationSheet
                passChildData={handleChildData}
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
                user_id={user?.id}
                organization_id={organization_id}
                organizationmembers={organizationmembers}
              />
              </div>
            </TabsList>
            <TabsContent value="members" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
            <Card className="col-span-12">
              <CardHeader>
              <CardTitle className="text-sm font-medium">
                <h6 className="text-gray-900 sm:text-xl">Organization Members</h6>
                </CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
              <OrganizationMembersList data={organizationmembers} groups={organizationmembergroups} refetchUserGroups={refetchUserGroups} isAdmin={isAdmin}/>
              </CardContent>
            </Card>
          </div>
            </TabsContent>
            <TabsContent value="invitations" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
                <Card className="col-span-12">
                  <CardHeader>
                 <CardTitle className="text-sm font-medium">
                   <h6 className="text-gray-900 sm:text-xl">Invitations</h6>
                 </CardTitle>
                  </CardHeader>
                  <CardContent>
                  <OrganizationInvitationList
                    data={invitations}
                    refetch = {refetchInvitations}
                    isAdmin={isAdmin}
                    />
                  </CardContent>
                </Card>
          </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
