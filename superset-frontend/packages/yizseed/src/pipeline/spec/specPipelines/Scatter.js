"use strict";
/**
 * SCATTER图表规范生成Pipeline
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createScatterSpecPipeline = void 0;
const PipelineCore_1 = require("../../PipelineCore");
const DataModule_1 = require("../DataModule");
const Legend_1 = require("../style/Legend");
const Label_1 = require("../style/Label");
const Tooltip_1 = require("../style/Tooltip");
const Axes_1 = require("../style/Axes");
const initVChartScatter_1 = require("../init/initVChartScatter");
// 创建SCATTER图表Pipeline
const createScatterSpecPipeline = () => (0, PipelineCore_1.pipeline)([
    initVChartScatter_1.initVChartScatter,
    DataModule_1.initData,
    Axes_1.configureAxes,
    Legend_1.configureLegend,
    Label_1.configureLabel,
    Tooltip_1.configureTooltip
], {});
exports.createScatterSpecPipeline = createScatterSpecPipeline;
//# sourceMappingURL=Scatter.js.map