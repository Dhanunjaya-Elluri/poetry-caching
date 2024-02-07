import {
  PaginatedPromptResponseTableData,
  TestPromptSummary,
  ValidaitorTest,
  ValidaitorTestResult,
} from "@/types/validaitorTests";
import { apiSlice } from "../services/apiSlice";
import { Dictionary } from "@reduxjs/toolkit";
import { ValidaitorMetricResult } from "@/types/metrics";

const testApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveTests: builder.query<ValidaitorTest[], Record<string, any>>({
      query: (params) => ({
        url: "validaitor_tests/",
        params, // Directly pass the params object
      }),
      providesTags: ["ValidaitorTest"],
    }),
    createTest: builder.mutation<ValidaitorTest, Partial<ValidaitorTest>>({
      query: (testData) => ({
        url: "validaitor_tests/",
        method: "POST",
        body: {
          name: testData.name,
          category: testData.category,
          project: testData.project,
          config: testData.config,
        },
      }),
      invalidatesTags: ["ValidaitorTest"],
    }),
    retrieveTest: builder.query<ValidaitorTest, number>({
      query: (id: number) => `validaitor_tests/${id}/`,
    }),
    deleteTest: builder.mutation({
      query: (id: number) => ({
        url: `validaitor_tests/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ValidaitorTest"],
    }),

    executeTest: builder.mutation({
      query: (id: number) => ({
        url: `validaitor_tests/${id}/execute/`,
        method: "POST",
      }),
      invalidatesTags: ["ValidaitorTest"],
    }),
    retrieveTestResults: builder.query<ValidaitorMetricResult[], number>({
      query: (id: number) => ({
        url: `validaitor_tests/${id}/result/`,
      }),
    }),
    retrieveTestPromptSummary: builder.query<TestPromptSummary, number>({
      query: (id: number) => ({
        url: `validaitor_tests/${id}/prompt_summary/`,
      }),
    }),
    retrieveTestPromptResponses: builder.query<
      PaginatedPromptResponseTableData,
      {
        id: number;
        filterValue?: string;
        page?: number;
        pageSize?: number;
      }
    >({
      query: ({ id, filterValue, page = 1, pageSize = 10 }) => {
        let url = `validaitor_tests/${id}/prompt_responses/?page=${page}&page_size=${pageSize}`;

        // Append the filter value if provided
        if (filterValue) {
          url += `&filter=${encodeURIComponent(filterValue)}`;
        }

        return { url };
      },
    }),
    retrieveTestCategories: builder.query<string[], void>({
      query: () => "validaitor_tests/categories/",
    }),
  }),
});

export const {
  useRetrieveTestsQuery,
  useRetrieveTestQuery,
  useCreateTestMutation,
  useDeleteTestMutation,
  useExecuteTestMutation,
  useRetrieveTestResultsQuery,
  useRetrieveTestPromptResponsesQuery,
  useRetrieveTestCategoriesQuery,
  useRetrieveTestPromptSummaryQuery
} = testApiSlice;
