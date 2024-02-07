export type ValidaitorMetricConfiguration = {
    id?: number;
    name: string;
    description?: string;
    type: string;
    config: { [key: string]: any };
    lower_threshold?: number;
    upper_threshold?: number;
    created_at?: string;
    metadata?: { [key: string]: any };
};

export type ValidaitorMetricResult = {
    id: number;
    validaitor_test: number;
    metric_config: ValidaitorMetricConfiguration;
    result: { [key: string]: any };
    created_at?: string;
    failed?: boolean;
};
