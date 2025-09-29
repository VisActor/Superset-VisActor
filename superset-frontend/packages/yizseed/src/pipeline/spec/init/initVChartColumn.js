"use strict";
/**
 * VChart柱状图/条形图初始化模块
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initVChartColumn = void 0;
// VChart柱状图/条形图初始化（支持多种类型）
const initVChartColumn = (spec, context) => {
    const chartType = 'bar';
    const encodes = context.encodes[0] || {};
    // 根据图表类型设置不同的字段映射
    const baseSpec = Object.assign(Object.assign({}, spec), { type: chartType, xField: encodes.x || encodes.category || 'category', yField: encodes.y || encodes.value || 'value', seriesField: encodes.group || encodes.color || 'group' });
    return baseSpec;
};
exports.initVChartColumn = initVChartColumn;
//# sourceMappingURL=initVChartColumn.js.map