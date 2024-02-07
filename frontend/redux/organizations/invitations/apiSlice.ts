

import { UserOrganizationInvitations } from '@/types/organization';
import { apiSlice } from '../../services/apiSlice';

const userorganizationinvitationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveUserOrganizationInvitations: builder.query<UserOrganizationInvitations[], { organization_id: number }>({
      query: ({ organization_id }) => ({
        url: 'userorganizationinvitations/',
        method: 'GET',
        params: { organization_id: organization_id },
      }),
    }),
    createUserOrganizationInvitation: builder.mutation({
      query: ({ from_invitation, to_invitation, organization, group, status }) => ({
        url: 'userorganizationinvitations/create-invitation/',
        method: 'POST',
        body: {from_invitation, to_invitation, organization, group, status},
      }),
    }),
    acceptInvitation: builder.mutation({
      query: ({ user_id, uid, token }) => ({
        url: 'userorganizationinvitations/accept-invitation/',
        method: 'POST',
        body: {user_id, uid, token},
      }),
    }),
    rejectInvitation: builder.mutation({
      query: ({ invitation_id }) => ({
        url: 'userorganizationinvitations/reject-invitation/',
        method: 'POST',
        body: {invitation_id},
      }),
    }),
    deleteUserOrganizationInvitation: builder.mutation({
      query: (id: number) => ({
        url: `userorganizationinvitations/${id}/`,
        method: 'DELETE',
      }),
    }),
    checkUserOrganizationInvitations: builder.query({
      query: () => ({
        url: 'userorganizationinvitations/check-invitation/',
        method: 'GET',
      }),
    }),
  }),
});

export const { useRetrieveUserOrganizationInvitationsQuery, useCreateUserOrganizationInvitationMutation, useAcceptInvitationMutation, useRejectInvitationMutation, useDeleteUserOrganizationInvitationMutation, useCheckUserOrganizationInvitationsQuery } =
userorganizationinvitationsApiSlice;
