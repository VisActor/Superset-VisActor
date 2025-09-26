"use strict";
/**
 * 双指标映射策略
 * 功能：x通道使用第一个指标，y通道使用第二个指标，color通道使用第一个维度
 * 适用于：散点图等需要比较两个指标关系的图表
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapTwoMeasures = void 0;
/**
 * 双指标映射函数
 */
const mapTwoMeasuresChannels = (fieldSelection) => {
    const { dimensions, measures } = fieldSelection;
    return {
        x: measures[0], // X轴使用第一个指标
        y: measures[1], // Y轴使用第二个指标
        color: dimensions[0] // 颜色使用第一个维度
    };
};
/**
 * 双指标通道映射Pipeline步骤
 */
const mapTwoMeasures = (vizSeed, context) => {
    const { fieldSelection } = context;
    if (!fieldSelection || (fieldSelection.dimensions.length === 0 && fieldSelection.measures.length === 0)) {
        return vizSeed;
    }
    // 使用双指标映射策略
    const autoMapping = mapTwoMeasuresChannels(fieldSelection);
    // 过滤掉undefined的值
    const filteredMapping = {};
    Object.entries(autoMapping).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            filteredMapping[key] = value;
        }
    });
    // 更新context和vizSeed
    const updatedEncodes = [filteredMapping];
    context.encodes = updatedEncodes;
    return Object.assign(Object.assign({}, vizSeed), { encodes: updatedEncodes });
};
exports.mapTwoMeasures = mapTwoMeasures;
//# sourceMappingURL=TwoMeasureMapping.js.map