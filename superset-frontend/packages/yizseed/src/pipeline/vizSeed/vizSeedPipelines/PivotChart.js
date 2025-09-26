"use strict";
/**
 * PIVOT_CHART图表VizSeed Pipeline
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPivotChartVizSeedPipeline = void 0;
const PipelineCore_1 = require("../../PipelineCore");
const ChartAdapterModule_1 = require("../ChartAdapterModule");
const VizSeedInitModule_1 = require("../VizSeedInitModule");
const VizSeedCleanupModule_1 = require("../VizSeedCleanupModule");
const PivotTableMapping_1 = require("../channelMapping/PivotTableMapping");
// 创建PIVOT_CHART图表VizSeed Pipeline
const createPivotChartVizSeedPipeline = () => {
    const buildPivotChartVizSeedSteps = [
        VizSeedInitModule_1.vizSeedInitStep,
        ChartAdapterModule_1.chartAdapterStep,
        PivotTableMapping_1.mapPivotTable, // 重用PivotTable的映射逻辑，因为都需要行列维度
        VizSeedCleanupModule_1.vizSeedCleanupStep
    ];
    return (0, PipelineCore_1.pipeline)(buildPivotChartVizSeedSteps, {});
};
exports.createPivotChartVizSeedPipeline = createPivotChartVizSeedPipeline;
//# sourceMappingURL=PivotChart.js.map