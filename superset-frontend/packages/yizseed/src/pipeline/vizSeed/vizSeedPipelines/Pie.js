"use strict";
/**
 * PIE图表VizSeed Pipeline
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPieVizSeedPipeline = void 0;
const PipelineCore_1 = require("../../PipelineCore");
const ChartAdapterModule_1 = require("../ChartAdapterModule");
const VizSeedInitModule_1 = require("../VizSeedInitModule");
const VizSeedCleanupModule_1 = require("../VizSeedCleanupModule");
const CategoryValueMapping_1 = require("../channelMapping/CategoryValueMapping");
const DataReshapeModule_1M1D_1 = require("../dataReshape/DataReshapeModule_1M1D");
// 创建PIE图表VizSeed Pipeline
const createPieVizSeedPipeline = () => {
    const buildPieVizSeedSteps = [
        VizSeedInitModule_1.vizSeedInitStep,
        ChartAdapterModule_1.chartAdapterStep,
        DataReshapeModule_1M1D_1.dataReshapeStep_1M1D,
        CategoryValueMapping_1.mapCategoryValue,
        VizSeedCleanupModule_1.vizSeedCleanupStep
    ];
    return (0, PipelineCore_1.pipeline)(buildPieVizSeedSteps, {});
};
exports.createPieVizSeedPipeline = createPieVizSeedPipeline;
//# sourceMappingURL=Pie.js.map