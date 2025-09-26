"use strict";
/**
 * BAR图表VizSeed Pipeline
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBarVizSeedPipeline = void 0;
const PipelineCore_1 = require("../../PipelineCore");
const ChartAdapterModule_1 = require("../ChartAdapterModule");
const VizSeedInitModule_1 = require("../VizSeedInitModule");
const DataReshapeModule_1M1D1G_1 = require("../dataReshape/DataReshapeModule_1M1D1G");
const VizSeedCleanupModule_1 = require("../VizSeedCleanupModule");
const HorizontalBarMapping_1 = require("../channelMapping/HorizontalBarMapping");
// 创建BAR图表VizSeed Pipeline
const createBarVizSeedPipeline = () => {
    const buildBarVizSeedSteps = [
        VizSeedInitModule_1.vizSeedInitStep,
        ChartAdapterModule_1.chartAdapterStep,
        DataReshapeModule_1M1D1G_1.dataReshapeStep_1M1D1G,
        HorizontalBarMapping_1.mapHorizontalBar,
        VizSeedCleanupModule_1.vizSeedCleanupStep
    ];
    return (0, PipelineCore_1.pipeline)(buildBarVizSeedSteps, {});
};
exports.createBarVizSeedPipeline = createBarVizSeedPipeline;
//# sourceMappingURL=Bar.js.map