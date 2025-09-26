export interface ColorConfig {
    colors: Array<{
        id: string;
        name: string;
        value: string;
    }>;
    [key: string]: any;
}
export interface LegendConfig {
    visible: boolean;
    [key: string]: any;
}
export interface LabelConfig {
    visible: boolean;
    [key: string]: any;
}
export interface TooltipConfig {
    visible: boolean;
    [key: string]: any;
}
export interface AnimationConfig {
    visible: boolean;
    [key: string]: any;
}
export interface ResponsiveConfig {
    widthMode: 'standard' | 'adaptive';
    heightMode: 'standard' | 'adaptive';
    [key: string]: any;
}
export interface AxisConfig {
    [key: string]: any;
}
export interface ColumnStackConfig {
    stackRadius: number;
    [key: string]: any;
}
export interface PieConfig {
    [key: string]: any;
}
export interface LineStyleConfig {
    [key: string]: any;
}
export interface LineConfig {
    lineStyle: LineStyleConfig;
    [key: string]: any;
}
export interface VisualStyle {
    title: string;
    color: ColorConfig | string[];
    legend: LegendConfig;
    label: LabelConfig;
    tooltip: TooltipConfig;
    animation: AnimationConfig;
    responsive: ResponsiveConfig;
    yAxis: AxisConfig;
    xAxis: AxisConfig;
    columnStack: ColumnStackConfig;
    pie: PieConfig;
    pivotPie: PieConfig;
    doughnut: PieConfig;
    line: LineConfig;
    [key: string]: any;
}
//# sourceMappingURL=visualStyle.d.ts.map