"use strict";
/**
 * VChart饼图初始化模块
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initVChartPie = void 0;
// VChart饼图初始化
const initVChartPie = (spec, context) => {
    const encodes = context.encodes[0] || {};
    return Object.assign(Object.assign({}, spec), { type: 'pie', categoryField: encodes.category || encodes.x || 'category', valueField: encodes.value || encodes.y || 'value' });
};
exports.initVChartPie = initVChartPie;
//# sourceMappingURL=initVChartPie.js.map