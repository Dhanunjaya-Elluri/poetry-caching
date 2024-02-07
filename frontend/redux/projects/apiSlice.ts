
import { Project } from '@/types/project';
import { apiSlice } from '../services/apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveProjects: builder.query<Project[], void>({
      query: () => ({
        url: 'projects/',
      }),
      providesTags: ['Project'],
    }),
    retrieveProject: builder.query<Project, string>({
      query: (id) => ({
        url: `projects/${id}/`,
      }),
      providesTags: ['Project'],
    }),
    createProject: builder.mutation({
      query: ({ name, organization, description }: Project) => ({
        url: 'projects/',
        method: 'POST',
        body: { name, organization, description },
      }),
      invalidatesTags: ['Project'],
    }),
    deleteProject: builder.mutation({
      query: (id: number) => ({
        url: `projects/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
  }),
});

export const { useRetrieveProjectsQuery, useRetrieveProjectQuery, useCreateProjectMutation, useDeleteProjectMutation } =
  authApiSlice;
