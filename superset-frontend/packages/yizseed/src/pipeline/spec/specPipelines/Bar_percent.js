"use strict";
/**
 * BAR图表规范生成Pipeline
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBarPercentSpecPipeline = void 0;
const PipelineCore_1 = require("../../PipelineCore");
const DataModule_1 = require("../DataModule");
const Legend_1 = require("../style/Legend");
const Label_1 = require("../style/Label");
const Tooltip_1 = require("../style/Tooltip");
const Axes_1 = require("../style/Axes");
const initVChartBar_1 = require("../init/initVChartBar");
const percent_1 = require("../aggregation/percent");
const Color_1 = require("../style/Color");
// 创建BAR图表Pipeline
const createBarPercentSpecPipeline = () => (0, PipelineCore_1.pipeline)([
    initVChartBar_1.initVChartBar,
    DataModule_1.initData,
    percent_1.percent,
    Axes_1.xLinearAxis,
    Axes_1.yBandAxis,
    Color_1.configureColor,
    Legend_1.configureLegend,
    Label_1.configureLabel,
    Tooltip_1.configureTooltip
], {});
exports.createBarPercentSpecPipeline = createBarPercentSpecPipeline;
//# sourceMappingURL=Bar_percent.js.map