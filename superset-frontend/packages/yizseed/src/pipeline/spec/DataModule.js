"use strict";
/**
 * 数据处理模块
 * 可重用的Pipeline步骤，用于处理数据转换和字段映射
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initData = void 0;
// 数据初始化步骤
const initData = (spec, context) => {
    const { data } = context;
    return Object.assign(Object.assign({}, spec), { data: [{
                id: 'VizSeedData',
                values: data,
            }] });
};
exports.initData = initData;
//# sourceMappingURL=DataModule.js.map