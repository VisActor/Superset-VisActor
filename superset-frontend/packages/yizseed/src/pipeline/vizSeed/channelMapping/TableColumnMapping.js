"use strict";
/**
 * 表格列映射策略
 * 功能：将所有维度和指标字段映射为表格的列
 * 适用于：表格展示所有字段的场景
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapTableColumn = void 0;
/**
 * 表格列映射函数
 * 将所有维度和指标字段作为表格的列
 */
const mapTableColumnChannels = (fieldSelection) => {
    const { dimensions, measures } = fieldSelection;
    return {
        columnDimension: dimensions, // 维度字段作为列
        measure: measures // 指标字段作为列
    };
};
/**
 * 表格列通道映射Pipeline步骤
 */
const mapTableColumn = (vizSeed, context) => {
    const { fieldSelection } = context;
    if (!fieldSelection || (fieldSelection.dimensions.length === 0 && fieldSelection.measures.length === 0)) {
        return vizSeed;
    }
    // 使用表格列映射策略
    const autoMapping = mapTableColumnChannels(fieldSelection);
    // 过滤掉undefined的值和空数组
    const filteredMapping = {};
    Object.entries(autoMapping).forEach(([key, value]) => {
        if (value !== undefined && value !== null && Array.isArray(value) && value.length > 0) {
            filteredMapping[key] = value;
        }
    });
    // 更新context和vizSeed
    const updatedEncodes = [filteredMapping];
    context.encodes = updatedEncodes;
    return Object.assign(Object.assign({}, vizSeed), { encodes: updatedEncodes });
};
exports.mapTableColumn = mapTableColumn;
//# sourceMappingURL=TableColumnMapping.js.map