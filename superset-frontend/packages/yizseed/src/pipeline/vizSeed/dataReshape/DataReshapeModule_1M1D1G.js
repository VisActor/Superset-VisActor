"use strict";
/**
 * 数据重塑模块 - 使用Pipeline子模块实现维度重塑
 * 输入：指标大于等于1，维度大于等于0
 * 输出：维度2，指标1
 * 适用于：饼图、环形图等需要2维1指标的图表
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataReshapeStep_1M1D1G = void 0;
const ElevateAndReduce_1 = require("../utils/ElevateAndReduce");
const DimensionAndMeasureCopy_1 = require("../utils/DimensionAndMeasureCopy");
// elevateStep 和 reduceStep 已从 './utils/ElevateAndReduce' 导入
/**
 * 数据重塑Pipeline步骤 - 使用子模块实现智能重塑
 */
const dataReshapeStep_1M1D1G = (vizSeed, context) => {
    const targetDims = 2;
    const targetMeas = 1;
    // 如果当前结构已经符合要求
    if (context.fieldSelection.dimensions.length === targetDims && context.fieldSelection.measures.length === targetMeas) {
        return Object.assign(Object.assign({}, vizSeed), { data: context.data, reshapeInfo: {
                steps: []
            } });
    }
    const operations = [];
    if (context.fieldSelection.dimensions.length > 0) {
        // 如果维度大于0，使用降维子模块和升维子模块
        let currentDimensionLength = context.fieldSelection.dimensions.length;
        // 多次降维直到达到目标维度数
        while (currentDimensionLength > targetDims - 1) {
            vizSeed = (0, ElevateAndReduce_1.reduceStep)(vizSeed, context);
            // 检查是否实际进行了降维
            const afterDimensionLength = context.fieldSelection.dimensions.length;
            if (afterDimensionLength >= currentDimensionLength) {
                break; // 防止无限循环
            }
            currentDimensionLength = afterDimensionLength;
            operations.push('reduce');
        }
        // 升维子模块
        if (context.fieldSelection.measures.length >= targetMeas) {
            vizSeed = (0, ElevateAndReduce_1.elevateStep)(vizSeed, context);
            operations.push('elevate');
        }
    }
    else {
        // 维度为0的情况：先升维，再复制维度
        // 第一步：升维 - 将多指标转为单指标+指标名称维度
        if (context.fieldSelection.measures.length >= targetMeas) {
            vizSeed = (0, ElevateAndReduce_1.elevateStep)(vizSeed, context);
            operations.push('elevate');
        }
        // 第二步：复制维度 - 确保有足够的维度数量
        if (context.fieldSelection.dimensions.length > 0 && context.fieldSelection.dimensions.length < targetDims) {
            vizSeed = (0, DimensionAndMeasureCopy_1.copyDimensionStep)(vizSeed, context);
            operations.push('copyDimension');
        }
    }
    return Object.assign(Object.assign({}, vizSeed), { data: context.data, reshapeInfo: {
            steps: operations
        } });
};
exports.dataReshapeStep_1M1D1G = dataReshapeStep_1M1D1G;
//# sourceMappingURL=DataReshapeModule_1M1D1G.js.map