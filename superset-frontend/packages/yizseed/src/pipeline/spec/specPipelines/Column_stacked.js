"use strict";
/**
 * COLUMN堆叠图表规范生成Pipeline
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createColumnStackedSpecPipeline = void 0;
const PipelineCore_1 = require("../../PipelineCore");
const DataModule_1 = require("../DataModule");
const Legend_1 = require("../style/Legend");
const Label_1 = require("../style/Label");
const Tooltip_1 = require("../style/Tooltip");
const Axes_1 = require("../style/Axes");
const initVChartColumn_1 = require("../init/initVChartColumn");
const stacked_1 = require("../aggregation/stacked");
// 创建COLUMN堆叠图表Pipeline
const createColumnStackedSpecPipeline = () => (0, PipelineCore_1.pipeline)([
    initVChartColumn_1.initVChartColumn,
    DataModule_1.initData,
    stacked_1.stacked,
    Axes_1.xBandAxis,
    Axes_1.yLinearAxis,
    Legend_1.configureLegend,
    Label_1.configureLabel,
    Tooltip_1.configureTooltip
], {});
exports.createColumnStackedSpecPipeline = createColumnStackedSpecPipeline;
//# sourceMappingURL=Column_stacked.js.map