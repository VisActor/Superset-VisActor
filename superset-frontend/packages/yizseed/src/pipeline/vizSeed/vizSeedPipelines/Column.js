"use strict";
/**
 * COLUMN图表VizSeed Pipeline
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createColumnVizSeedPipeline = void 0;
const PipelineCore_1 = require("../../PipelineCore");
const ChartAdapterModule_1 = require("../ChartAdapterModule");
const VizSeedInitModule_1 = require("../VizSeedInitModule");
const DataReshapeModule_1M1D1G_1 = require("../dataReshape/DataReshapeModule_1M1D1G");
const VizSeedCleanupModule_1 = require("../VizSeedCleanupModule");
const VerticalColumnMapping_1 = require("../channelMapping/VerticalColumnMapping");
// 创建COLUMN图表VizSeed Pipeline
const createColumnVizSeedPipeline = () => {
    const buildColumnVizSeedSteps = [
        VizSeedInitModule_1.vizSeedInitStep,
        ChartAdapterModule_1.chartAdapterStep,
        DataReshapeModule_1M1D1G_1.dataReshapeStep_1M1D1G,
        VerticalColumnMapping_1.mapVerticalColumn,
        VizSeedCleanupModule_1.vizSeedCleanupStep
    ];
    return (0, PipelineCore_1.pipeline)(buildColumnVizSeedSteps, {});
};
exports.createColumnVizSeedPipeline = createColumnVizSeedPipeline;
//# sourceMappingURL=Column.js.map