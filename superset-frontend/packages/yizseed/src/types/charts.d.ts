import { z } from 'zod';
export declare enum ChartType {
    BAR = "bar",// 柱状图
    BAR_STACKED = "bar_stacked",// 堆叠柱状图
    BAR_GROUPED = "bar_grouped",// 分组柱状图
    BAR_PERCENT = "bar_percent",// 百分比柱状图
    COLUMN = "column",// 条形图
    COLUMN_STACKED = "column_stacked",// 堆叠条形图
    COLUMN_GROUPED = "column_grouped",// 分组条形图
    COLUMN_PERCENT = "column_percent",// 百分比条形图
    LINE = "line",// 折线图
    AREA = "area",// 面积图
    AREA_STACKED = "area_stacked",// 堆叠面积图
    AREA_PERCENT = "area_percent",// 百分比面积图
    SCATTER = "scatter",// 散点图
    PIE = "pie",// 饼图
    DONUT = "donut",// 环形图
    TABLE = "table",// 表格
    PIVOT_TABLE = "pivottable",// 透视表
    PIVOT_CHART = "pivotchart"
}
export declare const ChartTypeSchema: z.ZodEffects<z.ZodEnum<["bar", "bar_stacked", "bar_grouped", "bar_percent", "column", "column_stacked", "column_grouped", "column_percent", "line", "area", "area_stacked", "area_percent", "scatter", "pie", "donut", "table", "pivottable", "pivotchart"]>, ChartType, "bar" | "bar_stacked" | "bar_grouped" | "bar_percent" | "column" | "column_stacked" | "column_grouped" | "column_percent" | "line" | "area" | "area_stacked" | "area_percent" | "scatter" | "pie" | "donut" | "table" | "pivottable" | "pivotchart">;
export declare function parseChartType(input: string): ChartType;
export interface ChannelMapping {
    x?: string | string[];
    y?: string | string[];
    color?: string | string[];
    group?: string | string[];
    category?: string;
    value?: string;
    rowDimension?: string | string[];
    columnDimension?: string | string[];
    measure?: string | string[];
}
export interface ChartChannels {
    dimensionChannels: string[];
    measureChannels: string[];
}
export interface ChartDataRequirement {
    channels: ChartChannels;
    idealDimensions: number;
    idealMeasures: number;
    minDimensions: number;
    minMeasures: number;
    chartType: string;
}
export declare const CHART_DATA_REQUIREMENTS: Record<ChartType, ChartDataRequirement>;
//# sourceMappingURL=charts.d.ts.map