"use strict";
/**
 * PIVOT_TABLE图表规范生成Pipeline
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPivotTableSpecPipeline = void 0;
const PipelineCore_1 = require("../../PipelineCore");
const initVTablePivot_1 = require("../init/initVTablePivot");
// 创建PIVOT_TABLE图表Pipeline
const createPivotTableSpecPipeline = () => (0, PipelineCore_1.pipeline)([
    initVTablePivot_1.initVTablePivot
], {});
exports.createPivotTableSpecPipeline = createPivotTableSpecPipeline;
//# sourceMappingURL=PivotTable.js.map