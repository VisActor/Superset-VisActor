/**
 * Pipeline注册表
 * 使用函数映射实现图表Pipeline管理，简洁高效的架构
 */
import { PipelineContext } from './PipelineCore';
import { ChartType } from '../types/charts';
export declare const buildSpec: (chartType: string, context: PipelineContext) => any;
export declare const buildVizSeed: (chartType: string, context: PipelineContext) => any;
export declare const getSupportedPipelineTypes: () => string[];
export declare const isPipelineSupported: (key: ChartType) => boolean;
//# sourceMappingURL=PipelineRegistry.d.ts.map