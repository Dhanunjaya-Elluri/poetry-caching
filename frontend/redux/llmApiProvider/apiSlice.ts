
import { LLMApiProvider } from '@/types/llmApiProvider';
import { apiSlice } from '../services/apiSlice';

const apiProviderSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveLLMApiProviders: builder.query<LLMApiProvider[], void>({
      query: () => ({
        url: 'llm-api-providers/',
      }),
      providesTags: ['LLMApiProvider'],
    }),
    retrieveLLMApiProvider: builder.query<LLMApiProvider, string>({
      query: (id) => ({
        url: `llm-api-providers/${id}/`,
      }),
    }),
    createLLMApiProvider: builder.mutation({
      query: ({ name }: LLMApiProvider) => ({
        url: 'llm-api-providers/',
        method: 'POST',
        body: { name},
      }),
      invalidatesTags: ['LLMApiProvider'],
    }),
    deleteLLMApiProvider: builder.mutation({
      query: (id: number) => ({
        url: `llm-api-providers/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['LLMApiProvider'],
    }),
  }),
});

export const { useRetrieveLLMApiProvidersQuery, useRetrieveLLMApiProviderQuery, useCreateLLMApiProviderMutation, useDeleteLLMApiProviderMutation } =
apiProviderSlice;
