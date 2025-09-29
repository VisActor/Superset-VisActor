"use strict";
/**
 * VTable表格初始化模块
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initVTableList = void 0;
// VTable表格初始化
const initVTableList = (spec, context) => {
    const { encodes, data } = context;
    // 根据encodes构造列配置
    const columns = [];
    if (encodes && encodes.length > 0) {
        const encode = encodes[0];
        // 处理维度字段（columnDimension是字符串数组）
        if (encode.columnDimension && Array.isArray(encode.columnDimension)) {
            encode.columnDimension.forEach((fieldName) => {
                if (fieldName && !fieldName.startsWith('__')) { // 排除内部字段
                    columns.push({
                        field: fieldName,
                        title: fieldName,
                        width: 'auto',
                        cellType: 'text'
                    });
                }
            });
        }
        // 处理指标字段（measure是字符串数组）
        if (encode.measure && Array.isArray(encode.measure)) {
            encode.measure.forEach((fieldName) => {
                if (fieldName) {
                    columns.push({
                        field: fieldName,
                        title: fieldName,
                        width: 'auto',
                        cellType: 'text',
                        style: {
                            textAlign: 'right' // 数值字段右对齐
                        }
                    });
                }
            });
        }
    }
    return Object.assign(Object.assign({}, spec), { columns, records: data || [] });
};
exports.initVTableList = initVTableList;
//# sourceMappingURL=initVTable.js.map