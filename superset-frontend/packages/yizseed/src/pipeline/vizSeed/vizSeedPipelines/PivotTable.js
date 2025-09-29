"use strict";
/**
 * PIVOT_TABLE图表VizSeed Pipeline
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPivotTableVizSeedPipeline = void 0;
const PipelineCore_1 = require("../../PipelineCore");
const ChartAdapterModule_1 = require("../ChartAdapterModule");
const VizSeedInitModule_1 = require("../VizSeedInitModule");
const VizSeedCleanupModule_1 = require("../VizSeedCleanupModule");
const PivotTableMapping_1 = require("../channelMapping/PivotTableMapping");
// 创建PIVOT_TABLE图表VizSeed Pipeline
const createPivotTableVizSeedPipeline = () => {
    const buildPivotTableVizSeedSteps = [
        VizSeedInitModule_1.vizSeedInitStep,
        ChartAdapterModule_1.chartAdapterStep,
        PivotTableMapping_1.mapPivotTable,
        VizSeedCleanupModule_1.vizSeedCleanupStep
    ];
    return (0, PipelineCore_1.pipeline)(buildPivotTableVizSeedSteps, {});
};
exports.createPivotTableVizSeedPipeline = createPivotTableVizSeedPipeline;
//# sourceMappingURL=PivotTable.js.map