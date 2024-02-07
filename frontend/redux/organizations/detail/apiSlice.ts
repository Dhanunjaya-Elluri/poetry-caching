

import { Organization, UserOrganization } from '@/types/organization';
import { apiSlice } from '../../services/apiSlice';

const userorganizationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveUserOrganizations: builder.query<UserOrganization[], { organization_id?: number }>({
      query: (params) => ({
        url: 'userorganizations/',
        params,
      }),
      providesTags: ['UserOrganization'],
    }),
    deleteUserOrganization: builder.mutation({
      query: (id: number) => ({
        url: `userorganizations/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['UserOrganization'],
    }),
  }),
});

export const { useRetrieveUserOrganizationsQuery, useDeleteUserOrganizationMutation } =
userorganizationApiSlice;
