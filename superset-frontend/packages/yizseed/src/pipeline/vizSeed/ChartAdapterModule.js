"use strict";
/**
 * 图表适配分析器
 * 分析图表类型对维度和指标的要求，并提供重塑策略建议
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartAdapterStep = exports.analyzeChartRequirements = void 0;
const charts_1 = require("../../types/charts");
// 分析图表数据要求
const analyzeChartRequirements = (chartType, dimensions, measures) => {
    const requirement = charts_1.CHART_DATA_REQUIREMENTS[chartType];
    const currentStructure = {
        dimensions: dimensions.length,
        measures: measures.length,
        dimensionNames: dimensions,
        measureNames: measures
    };
    return {
        currentStructure,
        targetStructure: requirement
    };
};
exports.analyzeChartRequirements = analyzeChartRequirements;
// 图表适配分析步骤
const chartAdapterStep = (vizSeed, context) => {
    const { chartType, fieldSelection } = context;
    // 分析图表要求
    const analysisResult = (0, exports.analyzeChartRequirements)(chartType, fieldSelection.dimensions, fieldSelection.measures);
    // 将分析结果添加到vizSeed
    return Object.assign(Object.assign({}, vizSeed), { analysisResult });
};
exports.chartAdapterStep = chartAdapterStep;
//# sourceMappingURL=ChartAdapterModule.js.map