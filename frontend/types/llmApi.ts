export type LLMApi = {
  id: number;
  name: string;
  project: string;
  project_name: string;
  api_url: string;
  credentials: ApiCredentials;
  llm_api_provider: LLMApiProvider | number;
  provider_name: string;
  created_at?: string;
  updated_at?: string;
  created_by?: number;
};

export type LLMApiProvider = {
  id: number;
  name: string;
  is_default: boolean;
  created_at?: string;
  updated_at?: string;
  created_by?: number;
};

// create type without id
export type LLMApiCreate = Omit<
  LLMApi,
  | 'id'
  | 'created_at'
  | 'updated_at'
  | 'created_by'
  | 'llm_api_provider'
> & {
  llm_api_provider: number;
  configuration_options?: AzureOpenAiClientConfiguration | any;
};

export type ApiCredentials = {
  username?: string;
  password?: string;
  api_token?: string;
};

export type AzureOpenAiClientConfiguration = {
  api_url: string;
  api_key: string;
  model: string;
  api_version: string;
};
