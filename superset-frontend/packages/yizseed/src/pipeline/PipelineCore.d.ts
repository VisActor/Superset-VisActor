/**
 * Pipeline 核心类型和工具函数
 * 简化的函数式管道处理系统
 */
import { NestedMeasure } from "../types";
import { ChartType, ChannelMapping } from "../types/charts";
export interface FieldDefinition {
    id: string;
    type: 'string' | 'number' | 'float' | 'date' | 'boolean';
    alias: string;
    location: 'dimension' | 'measure' | 'tooltips';
    domain?: any[];
    format?: Record<string, any>;
}
export interface FieldMap {
    [fieldId: string]: FieldDefinition;
}
export interface FieldSelection {
    dimensions: string[];
    measures: string[];
    groupMeasure?: NestedMeasure<string>[];
    rowDimensions?: string[];
    columnDimensions?: string[];
    indicatorChartSpecs?: Record<string, any>;
}
export interface PipelineContext {
    chartType: ChartType;
    encodes: ChannelMapping[];
    fieldMap: FieldMap;
    fieldSelection: FieldSelection;
    data: Record<string, any>[];
    visualStyle?: any;
    analysisResult?: any;
    theme: 'light' | 'dark' | 'custom';
    version: string;
    [key: string]: any;
}
export type PipelineStep<T = any> = (input: T, context: PipelineContext) => T;
export declare const pipeline: <T>(steps: PipelineStep<T>[], initialValue: T) => (context: PipelineContext) => T;
//# sourceMappingURL=PipelineCore.d.ts.map