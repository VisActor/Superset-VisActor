"use strict";
/**
 * 透视表映射策略
 * 功能：将rowDimensions、columnDimensions和measures映射为透视表的行、列、指标
 * 适用于：透视表展示多维数据交叉分析的场景
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPivotTable = void 0;
/**
 * 透视表映射函数
 * 将rowDimensions作为行维度，columnDimensions作为列维度，measures作为指标
 */
const mapPivotTableChannels = (fieldSelection) => {
    const { rowDimensions = [], columnDimensions = [], measures } = fieldSelection;
    return {
        rowDimension: rowDimensions, // 行维度字段
        columnDimension: columnDimensions, // 列维度字段  
        measure: measures // 指标字段
    };
};
/**
 * 透视表通道映射Pipeline步骤
 */
const mapPivotTable = (vizSeed, context) => {
    const { fieldSelection } = context;
    if (!fieldSelection) {
        return vizSeed;
    }
    const { rowDimensions = [], columnDimensions = [], measures = [] } = fieldSelection;
    // 透视表需要至少有行维度或列维度，以及指标
    if (rowDimensions.length === 0 && columnDimensions.length === 0) {
        // 如果没有设置行列维度，但设置了普通维度，则将普通维度作为行维度
        if (fieldSelection.dimensions && fieldSelection.dimensions.length > 0) {
            fieldSelection.rowDimensions = [...fieldSelection.dimensions];
        }
        else {
            return vizSeed;
        }
    }
    // 使用透视表映射策略
    const autoMapping = mapPivotTableChannels(fieldSelection);
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
exports.mapPivotTable = mapPivotTable;
//# sourceMappingURL=PivotTableMapping.js.map