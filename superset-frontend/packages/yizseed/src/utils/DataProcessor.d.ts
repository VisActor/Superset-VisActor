import { FieldMeta, FieldInferenceOptions, FieldStats } from '../types/data';
export declare class DataProcessor {
    static inferFields(rows: Record<string, any>[], options?: FieldInferenceOptions): FieldMeta[];
    private static inferSingleField;
    private static inferFieldType;
    private static isDateLike;
    private static createFieldMeta;
    private static inferNumericRole;
    private static calculateFieldStats;
    static getFieldValues(fieldName: string, rows: Record<string, any>[]): any[];
    static getFieldStats(fieldName: string, rows: Record<string, any>[]): FieldStats;
}
//# sourceMappingURL=DataProcessor.d.ts.map