"use strict";
/**
 * DONUT图表VizSeed Pipeline
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDonutVizSeedPipeline = void 0;
const PipelineCore_1 = require("../../PipelineCore");
const ChartAdapterModule_1 = require("../ChartAdapterModule");
const VizSeedInitModule_1 = require("../VizSeedInitModule");
const VizSeedCleanupModule_1 = require("../VizSeedCleanupModule");
const CategoryValueMapping_1 = require("../channelMapping/CategoryValueMapping");
const DataReshapeModule_1M1D_1 = require("../dataReshape/DataReshapeModule_1M1D");
// 创建DONUT图表VizSeed Pipeline
const createDonutVizSeedPipeline = () => {
    const buildDonutVizSeedSteps = [
        VizSeedInitModule_1.vizSeedInitStep,
        ChartAdapterModule_1.chartAdapterStep,
        DataReshapeModule_1M1D_1.dataReshapeStep_1M1D,
        CategoryValueMapping_1.mapCategoryValue,
        VizSeedCleanupModule_1.vizSeedCleanupStep
    ];
    return (0, PipelineCore_1.pipeline)(buildDonutVizSeedSteps, {});
};
exports.createDonutVizSeedPipeline = createDonutVizSeedPipeline;
//# sourceMappingURL=Donut.js.map