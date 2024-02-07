import {
  LLMApi,
  LLMApiCreate,
  LLMApiProvider,
} from "@/types/llmApi";
import { apiSlice } from "../services/apiSlice";
import { Dictionary } from "@reduxjs/toolkit";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveApis: builder.query<LLMApi[], Record<string, any>>({
      query: (params) => ({
        url: 'llm-apis/',
        params, // Directly pass the params object
      }),
      providesTags: ['LLMApi'],
    }),
    createApi: builder.mutation({
      query: (api_create: LLMApiCreate) => ({
        url: 'llm-apis/',
        method: 'POST',
        body: api_create,
      }),
      invalidatesTags: ['LLMApi'],
    }),
    deleteApi: builder.mutation({
      query: (id: number) => ({
        url: `llm-apis/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['LLMApi'],
    }),
    retrieveApiDashboard: builder.query<Dictionary<string>, string>({
      query: (id: string) => `llm-apis/${id}/dashboard/`,
      providesTags: ['LLMApi'],
    }),
    retrieveApiProviders: builder.query<LLMApiProvider[], Record<string, any>>({
      query: (params) => ({
          url: 'llm-api-providers/',
          params, // Directly pass the params object
        }),
      providesTags: ['LLMApiProvider'],
      }),
    retrieveApi: builder.query<LLMApi, number>({
      query: (id) => `llm-apis/${id}/`,
      providesTags: ['LLMApi'],
    }),
    getDefaultLLMApiProviders: builder.query<LLMApiProvider[], void>({
      query: () => 'llm-api-providers/',
    }),

    testConnection: builder.mutation({
      query: (apiCreate: LLMApiCreate) => ({
        url: `llm-apis/test-connection/`,
        method: 'POST',
        body: apiCreate,
      }),
    }),
  }),
});

export const {
  useRetrieveApisQuery,
  useCreateApiMutation,
  useRetrieveApiQuery,
  useDeleteApiMutation,
  useRetrieveApiDashboardQuery,
  useRetrieveApiProvidersQuery,
  useGetDefaultLLMApiProvidersQuery,
  useTestConnectionMutation,
} = authApiSlice;
