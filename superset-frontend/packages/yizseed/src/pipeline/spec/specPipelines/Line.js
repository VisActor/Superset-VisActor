"use strict";
/**
 * LINE图表规范生成Pipeline
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLineSpecPipeline = void 0;
const PipelineCore_1 = require("../../PipelineCore");
const DataModule_1 = require("../DataModule");
const Legend_1 = require("../style/Legend");
const Label_1 = require("../style/Label");
const Tooltip_1 = require("../style/Tooltip");
const Axes_1 = require("../style/Axes");
const initVChartLine_1 = require("../init/initVChartLine");
const SortXAxis_1 = require("../sort/SortXAxis");
// 创建LINE图表Pipeline
const createLineSpecPipeline = () => (0, PipelineCore_1.pipeline)([
    initVChartLine_1.initVChartLine,
    DataModule_1.initData,
    SortXAxis_1.SortXAxis,
    Axes_1.configureAxes,
    Legend_1.configureLegend,
    Label_1.configureLabel,
    Tooltip_1.configureTooltip
], {});
exports.createLineSpecPipeline = createLineSpecPipeline;
//# sourceMappingURL=Line.js.map