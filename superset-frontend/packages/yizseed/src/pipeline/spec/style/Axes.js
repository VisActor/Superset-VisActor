"use strict";
/**
 * 坐标轴配置步骤
 * 基于功能设计，而非图表类型
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.yyLinearAxis = exports.yBandAxis = exports.yLinearAxis = exports.xLinearAxis = exports.xBandAxis = exports.configureAxes = void 0;
// 综合坐标轴配置步骤（旧的兼容性方法）
const configureAxes = (spec, context) => {
    return Object.assign(Object.assign({}, spec), { axes: [
            {
                orient: 'bottom',
                type: 'band'
            },
            {
                orient: 'left',
                type: 'linear'
            }
        ] });
};
exports.configureAxes = configureAxes;
// X轴带状轴配置
const xBandAxis = (spec, context) => {
    const result = Object.assign({}, spec);
    if (!result.axes) {
        result.axes = [];
    }
    result.axes.push({
        orient: 'bottom',
        type: 'band'
    });
    return result;
};
exports.xBandAxis = xBandAxis;
// X轴线性轴配置
const xLinearAxis = (spec, context) => {
    const result = Object.assign({}, spec);
    if (!result.axes) {
        result.axes = [];
    }
    result.axes.push({
        orient: 'bottom',
        type: 'linear'
    });
    return result;
};
exports.xLinearAxis = xLinearAxis;
// Y轴线性轴配置
const yLinearAxis = (spec, context) => {
    const result = Object.assign({}, spec);
    if (!result.axes) {
        result.axes = [];
    }
    result.axes.push({
        orient: 'left',
        type: 'linear'
    });
    return result;
};
exports.yLinearAxis = yLinearAxis;
// Y轴带状轴配置
const yBandAxis = (spec, context) => {
    const result = Object.assign({}, spec);
    if (!result.axes) {
        result.axes = [];
    }
    result.axes.push({
        orient: 'left',
        type: 'band'
    });
    return result;
};
exports.yBandAxis = yBandAxis;
// 双Y轴线性配置
const yyLinearAxis = (spec, context) => {
    const result = Object.assign({}, spec);
    if (!result.axes) {
        result.axes = [];
    }
    result.axes.push({
        orient: 'left',
        type: 'linear'
    });
    result.axes.push({
        orient: 'right',
        type: 'linear'
    });
    return result;
};
exports.yyLinearAxis = yyLinearAxis;
//# sourceMappingURL=Axes.js.map