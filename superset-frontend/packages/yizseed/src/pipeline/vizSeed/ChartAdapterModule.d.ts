/**
 * 图表适配分析器
 * 分析图表类型对维度和指标的要求，并提供重塑策略建议
 */
import { PipelineStep } from '../PipelineCore';
import { ChartType, ChartDataRequirement } from '../../types/charts';
export interface ChartAnalysisResult {
    currentStructure: {
        dimensions: number;
        measures: number;
        dimensionNames: string[];
        measureNames: string[];
    };
    targetStructure: ChartDataRequirement;
}
export declare const analyzeChartRequirements: (chartType: ChartType, dimensions: string[], measures: string[]) => ChartAnalysisResult;
export declare const chartAdapterStep: PipelineStep;
//# sourceMappingURL=ChartAdapterModule.d.ts.map