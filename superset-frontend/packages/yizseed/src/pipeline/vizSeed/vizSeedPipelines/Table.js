"use strict";
/**
 * TABLE图表VizSeed Pipeline
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTableVizSeedPipeline = void 0;
const PipelineCore_1 = require("../../PipelineCore");
const ChartAdapterModule_1 = require("../ChartAdapterModule");
const VizSeedInitModule_1 = require("../VizSeedInitModule");
const VizSeedCleanupModule_1 = require("../VizSeedCleanupModule");
const TableColumnMapping_1 = require("../channelMapping/TableColumnMapping");
// 创建TABLE图表VizSeed Pipeline
const createTableVizSeedPipeline = () => {
    const buildTableVizSeedSteps = [
        VizSeedInitModule_1.vizSeedInitStep,
        ChartAdapterModule_1.chartAdapterStep,
        TableColumnMapping_1.mapTableColumn,
        VizSeedCleanupModule_1.vizSeedCleanupStep
    ];
    return (0, PipelineCore_1.pipeline)(buildTableVizSeedSteps, {});
};
exports.createTableVizSeedPipeline = createTableVizSeedPipeline;
//# sourceMappingURL=Table.js.map