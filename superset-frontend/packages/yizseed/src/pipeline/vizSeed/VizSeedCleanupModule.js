"use strict";
/**
 * VizSeed清理模块
 * 负责最终清理，确保只保留5个核心属性
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.vizSeedCleanupStep = void 0;
/**
 * VizSeed最终清理步骤
 * en
 */
const vizSeedCleanupStep = (vizSeed, context) => {
    var _a, _b, _c, _d, _e;
    return {
        chartType: context.chartType,
        data: context.data,
        fieldMap: context.fieldMap,
        encodes: context.encodes,
        style: context.visualStyle,
        dimensions: (_a = context.fieldSelection) === null || _a === void 0 ? void 0 : _a.dimensions,
        measures: (_b = context.fieldSelection) === null || _b === void 0 ? void 0 : _b.measures,
        rowDimensions: (_c = context.fieldSelection) === null || _c === void 0 ? void 0 : _c.rowDimensions,
        columnDimensions: (_d = context.fieldSelection) === null || _d === void 0 ? void 0 : _d.columnDimensions,
        indicatorChartSpecs: ((_e = context.fieldSelection) === null || _e === void 0 ? void 0 : _e.indicatorChartSpecs) || {},
        theme: context.theme,
        version: context.version
    };
};
exports.vizSeedCleanupStep = vizSeedCleanupStep;
//# sourceMappingURL=VizSeedCleanupModule.js.map