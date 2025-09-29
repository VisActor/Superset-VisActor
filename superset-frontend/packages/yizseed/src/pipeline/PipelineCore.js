"use strict";
/**
 * Pipeline 核心类型和工具函数
 * 简化的函数式管道处理系统
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipeline = void 0;
// 简化的管道函数工厂 - 使用reduce实现函数式组合
const pipeline = (steps, initialValue) => {
    return (context) => {
        return steps.reduce((result, step) => {
            return step(result, context);
        }, initialValue);
    };
};
exports.pipeline = pipeline;
//# sourceMappingURL=PipelineCore.js.map