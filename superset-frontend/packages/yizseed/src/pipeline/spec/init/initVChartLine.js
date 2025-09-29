"use strict";
/**
 * VChart折线图初始化模块
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initVChartLine = void 0;
// VChart折线图初始化
const initVChartLine = (spec, context) => {
    const encodes = context.encodes[0] || {};
    return Object.assign(Object.assign({}, spec), { type: 'line', xField: encodes.x || 'category', yField: encodes.y || 'value', seriesField: encodes.color || encodes.group });
};
exports.initVChartLine = initVChartLine;
//# sourceMappingURL=initVChartLine.js.map