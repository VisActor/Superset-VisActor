export type FieldType = 'string' | 'number' | 'date' | 'boolean';
export interface FieldMeta {
    name: string;
    type: FieldType;
    role: 'dimension' | 'measure';
    nullable?: boolean;
    unique?: boolean;
    aggregation?: 'sum' | 'avg' | 'count' | 'max' | 'min' | 'none';
    isDiscrete?: boolean;
}
export interface FieldInferenceOptions {
    numericRoleHint?: (fieldName: string, values: number[]) => 'dimension' | 'measure';
    typeHint?: (fieldName: string, values: any[]) => FieldType | undefined;
    autoConvertDates?: boolean;
    defaultAggregation?: 'sum' | 'avg' | 'count' | 'max' | 'min' | 'none';
}
export interface DataSet {
    fields: FieldMeta[];
    rows: Record<string, any>[];
    getFieldValues(fieldName: string): any[];
    getFieldStats(fieldName: string): FieldStats;
    getField(fieldName: string): FieldMeta | undefined;
    getDimensions(): FieldMeta[];
    getMeasures(): FieldMeta[];
    clone(): DataSet;
    addField(field: FieldMeta): void;
    removeField(fieldName: string): void;
}
export interface DataSetOptions {
    fields?: FieldMeta[];
    rows: Record<string, any>[];
    inferenceOptions?: FieldInferenceOptions;
}
export interface FieldStats {
    count: number;
    nullCount: number;
    uniqueCount: number;
    min?: any;
    max?: any;
    mean?: number;
    median?: number;
}
//# sourceMappingURL=data.d.ts.map