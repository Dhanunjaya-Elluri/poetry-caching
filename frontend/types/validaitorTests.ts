export type ValidaitorTest = {
  id?: number; // Optional as it won't be present when creating a new test
  name?: string; // Assuming you have a name field based on your backend model
  project_name?: string; // Optional as it's set by the backend
  category: string;
  status?: string; // Optional as it might not be present initially
  project: number; // Assuming you need to pass the project ID
  config: ValidaitorTestConfig;
  created_at?: string; // Optional as it's set by the backend
};

export type ValidaitorTestConfig = {
  llm_api: number; // Assuming llm_api should be a number (ID)
  prompt_collection: number;
  llm_api_name?: string; // Optional as it's set by the backend
}

export type ValidaitorTestResult = {
  id: number;
  test: ValidaitorTest;
  test_results: { [key: string]: string };
  created_at?: string;
};


export type PromptResponseTableData = {
  prompt_id: number;
  prompt_response_id: number;
  prompt_request_id: number;
  instructions: string;
  prompt_text: string;
  response_text: string;
  ground_truth: string;
  duration: number;
  is_correct: boolean;
  created_at: string;
}

export type PaginatedPromptResponseTableData = {
  count: number;
  next: string;
  previous: string;
  results: PromptResponseTableData[];
}


export type TestPromptSummary = {
  num_prompts: number;
  num_tokens: number;
  cost: number;
}
