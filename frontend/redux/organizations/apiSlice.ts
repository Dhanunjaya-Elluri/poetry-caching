

import { Organization } from '@/types/organization';
import { apiSlice } from '../services/apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveOrganizations: builder.query<Organization[], void>({
      query: () => 'organizations/',
      providesTags: ['Organization'],
    }),
    retrieveOrganization: builder.query<Organization, number>({
      query: (id: number) => `organizations/${id}/`,
    }),
    createOrganization: builder.mutation({
      query: ({ name, address, email }: Organization) => ({
        url: 'organizations/',
        method: 'POST',
        body: { name, address, email },
      }),
      invalidatesTags: ['Organization'],
    }),
    deleteOrganization: builder.mutation({
      query: (id: number) => ({
        url: `organizations/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Organization'],
    }),
    setOrganization: builder.mutation({
      query: (id: number) => ({
        url: `set-organization/`,
        method: 'POST',
        body: { id },
      }),
      invalidatesTags: ['Organization', 'Project', 'ValidaitorTest', 'LLMApi'],
    }),
  }),
});

export const { useRetrieveOrganizationsQuery, useCreateOrganizationMutation, useDeleteOrganizationMutation, useSetOrganizationMutation, useRetrieveOrganizationQuery } =
  authApiSlice;
