/**
 * 维度和指标复制工具模块
 * 提供复制指定维度或指标字段的功能，新字段命名为原字段名_copy
 */
import { PipelineStep } from '../../PipelineCore';
/**
 * 复制指定维度字段的Pipeline步骤
 * @param vizSeed VizSeed对象
 * @param context Pipeline上下文
 * @param dimensionName 要复制的维度字段名称，如果不指定则复制第一个维度
 */
export declare const copyDimensionStep: PipelineStep;
/**
 * 复制指定指标字段的Pipeline步骤
 * @param vizSeed VizSeed对象
 * @param context Pipeline上下文
 * @param measureName 要复制的指标字段名称，如果不指定则复制第一个指标
 */
export declare const copyMeasureStep: PipelineStep;
//# sourceMappingURL=DimensionAndMeasureCopy.d.ts.map