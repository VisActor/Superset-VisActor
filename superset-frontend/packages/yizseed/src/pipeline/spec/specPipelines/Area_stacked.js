"use strict";
/**
 * AREA堆叠图表规范生成Pipeline
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAreaStackedSpecPipeline = void 0;
const PipelineCore_1 = require("../../PipelineCore");
const DataModule_1 = require("../DataModule");
const Legend_1 = require("../style/Legend");
const Label_1 = require("../style/Label");
const Tooltip_1 = require("../style/Tooltip");
const Axes_1 = require("../style/Axes");
const initVChartArea_1 = require("../init/initVChartArea");
const stacked_1 = require("../aggregation/stacked");
const SortXAxis_1 = require("../sort/SortXAxis");
// 创建AREA堆叠图表Pipeline
const createAreaStackedSpecPipeline = () => (0, PipelineCore_1.pipeline)([
    initVChartArea_1.initVChartArea,
    DataModule_1.initData,
    SortXAxis_1.SortXAxis,
    stacked_1.stacked,
    Axes_1.xBandAxis,
    Axes_1.yLinearAxis,
    Legend_1.configureLegend,
    Label_1.configureLabel,
    Tooltip_1.configureTooltip
], {});
exports.createAreaStackedSpecPipeline = createAreaStackedSpecPipeline;
//# sourceMappingURL=Area_stacked.js.map