"use strict";
/**
 * PIE图表规范生成Pipeline
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPieSpecPipeline = void 0;
const PipelineCore_1 = require("../../PipelineCore");
const DataModule_1 = require("../DataModule");
const Legend_1 = require("../style/Legend");
const Label_1 = require("../style/Label");
const Tooltip_1 = require("../style/Tooltip");
const initVChartPie_1 = require("../init/initVChartPie");
const Color_1 = require("../style/Color");
const PieStyle_1 = require("../style/PieStyle");
// 创建PIE图表Pipeline
const createPieSpecPipeline = () => (0, PipelineCore_1.pipeline)([
    initVChartPie_1.initVChartPie,
    DataModule_1.initData,
    Legend_1.configureLegend,
    Label_1.configureLabel,
    Tooltip_1.configureTooltip,
    Color_1.configureColor,
    PieStyle_1.configurePieStyle
], {});
exports.createPieSpecPipeline = createPieSpecPipeline;
//# sourceMappingURL=Pie.js.map