"use strict";
/**
 * 时间序列映射策略
 * 功能：x通道使用第一个维度（时间轴），y通道使用第一个指标，color通道使用第二个维度或多指标名称
 * 适用于：折线图、面积图等需要展示时间趋势的图表
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapTimeSeries = void 0;
/**
 * 时间序列映射函数
 */
const mapTimeSeriesChannels = (fieldSelection) => {
    const { dimensions, measures } = fieldSelection;
    return {
        x: dimensions[0], // X轴使用第一个维度（通常是时间序列）
        y: measures[0], // Y轴使用第一个指标
        color: dimensions[1] || (measures.length > 1 ? '__MeasureName__' : undefined) // 多系列支持
    };
};
/**
 * 时间序列通道映射Pipeline步骤
 */
const mapTimeSeries = (vizSeed, context) => {
    const { fieldSelection } = context;
    if (!fieldSelection || (fieldSelection.dimensions.length === 0 && fieldSelection.measures.length === 0)) {
        return vizSeed;
    }
    // 使用时间序列映射策略
    const autoMapping = mapTimeSeriesChannels(fieldSelection);
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
exports.mapTimeSeries = mapTimeSeries;
//# sourceMappingURL=TimeSeriesMapping.js.map