"use strict";
/**
 * VizSeed初始化模块
 * 负责创建基础的VizSeed对象结构
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.vizSeedInitStep = void 0;
/**
 * VizSeed基础初始化步骤
 * 创建包含5个核心属性的VizSeed对象
 */
const vizSeedInitStep = (_vizSeed, context) => {
    const { chartType, encodes, fieldMap, data, visualStyle } = context;
    return {
        chartType: chartType,
        data: data || [], // 初始为空
        fieldMap: fieldMap || {},
        encodes: encodes || {},
        visualStyle: visualStyle || {}
    };
};
exports.vizSeedInitStep = vizSeedInitStep;
//# sourceMappingURL=VizSeedInitModule.js.map