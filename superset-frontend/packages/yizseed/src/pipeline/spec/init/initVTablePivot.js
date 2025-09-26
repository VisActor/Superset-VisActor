"use strict";
/**
 * VTable透视表初始化模块
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initVTablePivot = void 0;
// VTable透视表初始化
const initVTablePivot = (spec, context) => {
    const { encodes, data } = context;
    if (!encodes || encodes.length === 0) {
        return Object.assign(Object.assign({}, spec), { records: data || [] });
    }
    const encode = encodes[0];
    const { rowDimension = [], columnDimension = [], measure = [] } = encode;
    // 构造透视表的rows配置（行维度）
    const rows = [];
    if (Array.isArray(rowDimension)) {
        rowDimension.forEach((fieldName) => {
            if (fieldName) {
                rows.push({
                    dimensionKey: fieldName,
                    title: fieldName,
                    width: 'auto'
                });
            }
        });
    }
    // 构造透视表的columns配置（列维度）
    const columns = [];
    if (Array.isArray(columnDimension)) {
        columnDimension.forEach((fieldName) => {
            if (fieldName) {
                columns.push({
                    dimensionKey: fieldName,
                    title: fieldName,
                    width: 'auto'
                });
            }
        });
    }
    // 构造透视表的indicators配置（指标）
    const indicators = [];
    if (Array.isArray(measure)) {
        measure.forEach((fieldName) => {
            if (fieldName) {
                indicators.push({
                    indicatorKey: fieldName,
                    title: fieldName,
                    width: 'auto',
                    format: (value) => {
                        if (typeof value === 'number') {
                            return value.toLocaleString();
                        }
                        return value;
                    }
                });
            }
        });
    }
    return Object.assign(Object.assign({}, spec), { type: 'pivot-table', rows,
        columns,
        indicators, records: data || [], corner: {
            titleOnDimension: 'row'
        }, theme: 'DEFAULT' });
};
exports.initVTablePivot = initVTablePivot;
//# sourceMappingURL=initVTablePivot.js.map