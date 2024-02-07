

import { UserOrganizationGroup } from '@/types/organization';
import { apiSlice } from '../../services/apiSlice';

const usergroupsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveUserGroups: builder.query<UserOrganizationGroup[], number >({
      query: ( id ) => ({
        url: `userorganizationgroup/`,
        method: 'GET',
        params: { organization_id: id },
      }),
    }),
    updateUserGroups: builder.mutation({
      query: ({ organization_id, user_id, group_list }: { organization_id: string, user_id: string, group_list: string[] }) => ({
        url: 'userorganizationgroup/update-groups/',
        method: 'POST',
        body: { organization_id, user_id, group_list },
      }),
    }),
  }),
});

export const {useRetrieveUserGroupsQuery, useUpdateUserGroupsMutation} =
usergroupsApiSlice;
