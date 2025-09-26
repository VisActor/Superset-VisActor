"use strict";
/**
 * VChart散点图初始化模块
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initVChartScatter = void 0;
// VChart散点图初始化
const initVChartScatter = (spec, context) => {
    const encodes = context.encodes[0] || {};
    return Object.assign(Object.assign({}, spec), { type: 'scatter', xField: encodes.x || 'x', yField: encodes.y || 'y', seriesField: encodes.color || encodes.group });
};
exports.initVChartScatter = initVChartScatter;
//# sourceMappingURL=initVChartScatter.js.map