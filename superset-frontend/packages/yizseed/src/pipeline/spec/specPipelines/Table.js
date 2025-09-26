"use strict";
/**
 * TABLE图表规范生成Pipeline
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTableSpecPipeline = void 0;
const PipelineCore_1 = require("../../PipelineCore");
const initVTable_1 = require("../init/initVTable");
// 创建TABLE图表Pipeline
const createTableSpecPipeline = () => (0, PipelineCore_1.pipeline)([
    initVTable_1.initVTableList
], {});
exports.createTableSpecPipeline = createTableSpecPipeline;
//# sourceMappingURL=Table.js.map