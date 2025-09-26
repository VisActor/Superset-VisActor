"use strict";
/**
 * SCATTER图表VizSeed Pipeline
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createScatterVizSeedPipeline = void 0;
const PipelineCore_1 = require("../../PipelineCore");
const ChartAdapterModule_1 = require("../ChartAdapterModule");
const VizSeedInitModule_1 = require("../VizSeedInitModule");
const DataReshapeModule_1 = require("../DataReshapeModule");
const VizSeedCleanupModule_1 = require("../VizSeedCleanupModule");
const TwoMeasureMapping_1 = require("../channelMapping/TwoMeasureMapping");
// 创建SCATTER图表VizSeed Pipeline
const createScatterVizSeedPipeline = () => {
    const buildScatterVizSeedSteps = [
        VizSeedInitModule_1.vizSeedInitStep,
        ChartAdapterModule_1.chartAdapterStep,
        DataReshapeModule_1.dataReshapeStep,
        TwoMeasureMapping_1.mapTwoMeasures,
        VizSeedCleanupModule_1.vizSeedCleanupStep
    ];
    return (0, PipelineCore_1.pipeline)(buildScatterVizSeedSteps, {});
};
exports.createScatterVizSeedPipeline = createScatterVizSeedPipeline;
//# sourceMappingURL=Scatter.js.map