"use strict";
/**
 * VChart面积图初始化模块
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initVChartArea = void 0;
// VChart面积图初始化
const initVChartArea = (spec, context) => {
    const { encodes } = context;
    const mapping = encodes[0] || {};
    return Object.assign(Object.assign({}, spec), { type: 'area', xField: mapping.x || 'category', yField: mapping.y || 'value', seriesField: mapping.color || mapping.group });
};
exports.initVChartArea = initVChartArea;
//# sourceMappingURL=initVChartArea.js.map