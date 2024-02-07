
import { apiSlice } from '../services/apiSlice';

interface TaskStatus {
  task_id: string;
  status: string;
  result: any; // Replace 'any' with the actual type of 'result' if known
}

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveTaskStatus: builder.query<TaskStatus, number>({
      query: (id: number) => `task-status/${id}/`,
    }),
    retrieveTaskStatusForTest: builder.query<TaskStatus, number>({
      query: (id: number) => `task-status-for-test/${id}/`,
    }),
  }),
});

export const { useLazyRetrieveTaskStatusQuery, useRetrieveTaskStatusForTestQuery, useLazyRetrieveTaskStatusForTestQuery} =
  authApiSlice;
