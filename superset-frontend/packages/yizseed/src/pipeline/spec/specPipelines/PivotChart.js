"use strict";
/**
 * PIVOT_CHART图表规范生成Pipeline
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPivotChartSpecPipeline = void 0;
const PipelineCore_1 = require("../../PipelineCore");
const initVTablePivotChart_1 = require("../init/initVTablePivotChart");
// 创建PIVOT_CHART图表Pipeline
const createPivotChartSpecPipeline = () => (0, PipelineCore_1.pipeline)([
    initVTablePivotChart_1.initVTablePivotChart
], {});
exports.createPivotChartSpecPipeline = createPivotChartSpecPipeline;
//# sourceMappingURL=PivotChart.js.map