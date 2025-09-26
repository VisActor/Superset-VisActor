"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = exports.DataProcessor = exports.pipeline = exports.DataSet = exports.VizSeedBuilder = void 0;
// 核心构建器和数据集
const VizSeedBuilder_1 = require("./builder/VizSeedBuilder");
var VizSeedBuilder_2 = require("./builder/VizSeedBuilder");
Object.defineProperty(exports, "VizSeedBuilder", { enumerable: true, get: function () { return VizSeedBuilder_2.VizSeedBuilder; } });
var DataSet_1 = require("./datasets/DataSet");
Object.defineProperty(exports, "DataSet", { enumerable: true, get: function () { return DataSet_1.DataSet; } });
// 完整类型定义
__exportStar(require("./types"), exports);
// Pipeline工具（可选，高级用户使用）
var PipelineCore_1 = require("./pipeline/PipelineCore");
Object.defineProperty(exports, "pipeline", { enumerable: true, get: function () { return PipelineCore_1.pipeline; } });
// 数据处理工具
var DataProcessor_1 = require("./utils/DataProcessor");
Object.defineProperty(exports, "DataProcessor", { enumerable: true, get: function () { return DataProcessor_1.DataProcessor; } });
// 版本信息
exports.VERSION = '1.1.4';
// 默认导出（主要入口）
exports.default = VizSeedBuilder_1.VizSeedBuilder;
//# sourceMappingURL=index.js.map