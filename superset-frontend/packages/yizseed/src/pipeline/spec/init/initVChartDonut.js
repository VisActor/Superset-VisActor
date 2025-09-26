"use strict";
/**
 * VChart饼图初始化模块
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initVChartDonut = void 0;
// VChart饼图初始化
const initVChartDonut = (spec, context) => {
    const encodes = context.encodes[0] || {};
    return Object.assign(Object.assign({}, spec), { type: 'pie', categoryField: encodes.category || encodes.x || 'category', valueField: encodes.value || encodes.y || 'value', outerRadius: 0.8, innerRadius: 0.5, padAngle: 0.6 });
};
exports.initVChartDonut = initVChartDonut;
//# sourceMappingURL=initVChartDonut.js.map