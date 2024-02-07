export type LLMApiProvider = {
  id: number;
  name: string;
  project?: number;
  project_name?: string;
  client_configuration?: number;
  request_template?: LLMApiRequestTemplate | number;
  response_template?: LLMApiResponseTemplate | number;
  configuration_options?: Record<string, any>;
  is_default: boolean;
  created_at?: string;
  updated_at?: string;
  created_by: string;

};

export type LLMApiRequestTemplate = {
  id: number;
  name: string;
  template: Record<string, any>;
  project: number;
  created_by: number;
  created_at?: string;
  updated_at?: string;
};

export type LLMApiResponseTemplate = {
  id: number;
  name: string;
  response_path: string;
  metadata_paths?: Record<string, any>;
  project: number;
  created_by: number;
  created_at?: string;
  updated_at?: string;
};
