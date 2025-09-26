"use strict";
/**
 * COLUMN分组图表规范生成Pipeline
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createColumnGroupedSpecPipeline = void 0;
const PipelineCore_1 = require("../../PipelineCore");
const DataModule_1 = require("../DataModule");
const Legend_1 = require("../style/Legend");
const Label_1 = require("../style/Label");
const Tooltip_1 = require("../style/Tooltip");
const Axes_1 = require("../style/Axes");
const initVChartColumn_1 = require("../init/initVChartColumn");
const grouped_1 = require("../aggregation/grouped");
// 创建COLUMN分组图表Pipeline
const createColumnGroupedSpecPipeline = () => (0, PipelineCore_1.pipeline)([
    initVChartColumn_1.initVChartColumn,
    DataModule_1.initData,
    grouped_1.colGrouped,
    Axes_1.xBandAxis,
    Axes_1.yLinearAxis,
    Legend_1.configureLegend,
    Label_1.configureLabel,
    Tooltip_1.configureTooltip
], {});
exports.createColumnGroupedSpecPipeline = createColumnGroupedSpecPipeline;
//# sourceMappingURL=Column_grouped.js.map