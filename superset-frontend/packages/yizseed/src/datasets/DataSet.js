"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSet = void 0;
const DataProcessor_1 = require("../utils/DataProcessor");
class DataSet {
    constructor(rowsOrOptions, inferenceOptions) {
        if (Array.isArray(rowsOrOptions)) {
            // 直接传入rows数组的情况
            this.rows = rowsOrOptions;
            this.fields = DataProcessor_1.DataProcessor.inferFields(this.rows, inferenceOptions);
        }
        else {
            // 传入DataSetOptions对象的情况（向后兼容）
            const options = rowsOrOptions;
            this.rows = options.rows;
            if (options.fields) {
                this.fields = options.fields;
            }
            else {
                // 自动推断字段
                this.fields = DataProcessor_1.DataProcessor.inferFields(this.rows, options.inferenceOptions);
            }
        }
    }
    // 从rows数据自动生成DataSet
    static fromRows(rows, options) {
        return new DataSet({ rows, inferenceOptions: options });
    }
    // 获取字段的所有唯一值（替代原来的Field.values）
    getFieldValues(fieldName) {
        return DataProcessor_1.DataProcessor.getFieldValues(fieldName, this.rows);
    }
    // 获取字段统计信息
    getFieldStats(fieldName) {
        return DataProcessor_1.DataProcessor.getFieldStats(fieldName, this.rows);
    }
    // 根据字段名获取字段元数据
    getField(fieldName) {
        return this.fields.find(f => f.name === fieldName);
    }
    // 获取所有维度字段
    getDimensions() {
        return this.fields.filter(f => f.role === 'dimension');
    }
    // 获取所有指标字段
    getMeasures() {
        return this.fields.filter(f => f.role === 'measure');
    }
    // 克隆数据集
    clone() {
        return new DataSet({
            fields: JSON.parse(JSON.stringify(this.fields)),
            rows: JSON.parse(JSON.stringify(this.rows))
        });
    }
    // 添加新字段
    addField(field) {
        this.fields.push(field);
    }
    // 移除字段
    removeField(fieldName) {
        this.fields = this.fields.filter(f => f.name !== fieldName);
    }
}
exports.DataSet = DataSet;
//# sourceMappingURL=DataSet.js.map