"use strict";
/**
 * LINE图表VizSeed Pipeline
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLineVizSeedPipeline = void 0;
const PipelineCore_1 = require("../../PipelineCore");
const ChartAdapterModule_1 = require("../ChartAdapterModule");
const VizSeedInitModule_1 = require("../VizSeedInitModule");
const DataReshapeModule_1M1D1G_1 = require("../dataReshape/DataReshapeModule_1M1D1G");
const VizSeedCleanupModule_1 = require("../VizSeedCleanupModule");
const TimeSeriesMapping_1 = require("../channelMapping/TimeSeriesMapping");
// 创建LINE图表VizSeed Pipeline
const createLineVizSeedPipeline = () => {
    const buildLineVizSeedSteps = [
        VizSeedInitModule_1.vizSeedInitStep,
        ChartAdapterModule_1.chartAdapterStep,
        DataReshapeModule_1M1D1G_1.dataReshapeStep_1M1D1G,
        TimeSeriesMapping_1.mapTimeSeries,
        VizSeedCleanupModule_1.vizSeedCleanupStep
    ];
    return (0, PipelineCore_1.pipeline)(buildLineVizSeedSteps, {});
};
exports.createLineVizSeedPipeline = createLineVizSeedPipeline;
//# sourceMappingURL=Line.js.map