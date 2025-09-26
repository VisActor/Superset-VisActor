"use strict";
/**
 * DONUT图表规范生成Pipeline
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDonutSpecPipeline = void 0;
const PipelineCore_1 = require("../../PipelineCore");
const DataModule_1 = require("../DataModule");
const Legend_1 = require("../style/Legend");
const Label_1 = require("../style/Label");
const Tooltip_1 = require("../style/Tooltip");
const initVChartDonut_1 = require("../init/initVChartDonut");
// 创建DONUT图表Pipeline
const createDonutSpecPipeline = () => (0, PipelineCore_1.pipeline)([
    initVChartDonut_1.initVChartDonut,
    DataModule_1.initData,
    Legend_1.configureLegend,
    Label_1.configureLabel,
    Tooltip_1.configureTooltip
], {});
exports.createDonutSpecPipeline = createDonutSpecPipeline;
//# sourceMappingURL=Donut.js.map