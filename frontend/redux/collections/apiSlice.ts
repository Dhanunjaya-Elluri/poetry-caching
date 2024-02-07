import { PromptCollection } from "@/types/collection";
import { apiSlice } from "../services/apiSlice";

const collectionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveCollections: builder.query<PromptCollection[], void>({
      query: () => "prompt-collections/",
    }),
    retrieveCollection: builder.query<PromptCollection, number>({
      query: (id: number) => `prompt-collections/${id}/`,
    }),
  }),
});

export const { useRetrieveCollectionsQuery, useRetrieveCollectionQuery } = collectionApiSlice;
