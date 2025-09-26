import { DataSet as IDataSet, FieldMeta, FieldInferenceOptions, DataSetOptions } from '../types/data';
export declare class DataSet implements IDataSet {
    fields: FieldMeta[];
    rows: Record<string, any>[];
    constructor(rows: Record<string, any>[], options?: FieldInferenceOptions);
    constructor(options: DataSetOptions);
    static fromRows(rows: Record<string, any>[], options?: FieldInferenceOptions): DataSet;
    getFieldValues(fieldName: string): any[];
    getFieldStats(fieldName: string): import("../types/data").FieldStats;
    getField(fieldName: string): FieldMeta | undefined;
    getDimensions(): FieldMeta[];
    getMeasures(): FieldMeta[];
    clone(): DataSet;
    addField(field: FieldMeta): void;
    removeField(fieldName: string): void;
}
//# sourceMappingURL=DataSet.d.ts.map