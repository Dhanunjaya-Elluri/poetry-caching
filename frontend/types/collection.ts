export type PromptCollection = {
    id: number;
    name: string;
    source: string;
    category: string;
    contains_ground_truth: boolean;
    is_public: boolean;
    metadata: { [key: string]: any};
    description: string;
    created_at?: string;
    updated_at?: string;
    created_by?: number;
    };
