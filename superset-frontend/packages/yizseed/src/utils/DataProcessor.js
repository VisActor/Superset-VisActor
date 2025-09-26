"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataProcessor = void 0;
class DataProcessor {
    // 智能字段推断方法
    static inferFields(rows, options) {
        if (!rows || rows.length === 0) {
            return [];
        }
        // 扫描所有记录来发现所有字段（解决稀疏数据问题）
        const allFieldNames = new Set();
        rows.forEach(row => {
            Object.keys(row).forEach(key => allFieldNames.add(key));
        });
        const fieldNames = Array.from(allFieldNames);
        const fields = [];
        for (const fieldName of fieldNames) {
            const values = rows.map(row => row[fieldName]).filter(v => v != null);
            if (values.length === 0)
                continue;
            const fieldMeta = this.inferSingleField(fieldName, values, options);
            fields.push(fieldMeta);
        }
        return fields;
    }
    static inferSingleField(fieldName, values, options) {
        // 自定义类型推断
        if (options === null || options === void 0 ? void 0 : options.typeHint) {
            const customType = options.typeHint(fieldName, values);
            if (customType) {
                return this.createFieldMeta(fieldName, customType, values, options);
            }
        }
        // 自动类型推断
        const inferredType = this.inferFieldType(values, options === null || options === void 0 ? void 0 : options.autoConvertDates);
        return this.createFieldMeta(fieldName, inferredType, values, options);
    }
    static inferFieldType(values, autoConvertDates = true) {
        const sample = values.slice(0, Math.min(100, values.length)); // 采样前100个值
        // 检查是否为数值类型
        const numericCount = sample.filter(v => typeof v === 'number' && !isNaN(v)).length;
        if (numericCount / sample.length > 0.8) {
            return 'number';
        }
        // 检查是否为布尔类型
        const booleanCount = sample.filter(v => typeof v === 'boolean').length;
        if (booleanCount / sample.length > 0.8) {
            return 'boolean';
        }
        // 检查是否为日期类型
        if (autoConvertDates) {
            const dateCount = sample.filter(v => this.isDateLike(v)).length;
            if (dateCount / sample.length > 0.8) {
                return 'date';
            }
        }
        // 默认为字符串类型
        return 'string';
    }
    static isDateLike(value) {
        if (value instanceof Date)
            return true;
        if (typeof value !== 'string')
            return false;
        // 常见日期格式正则
        const datePatterns = [
            /^\d{4}-\d{2}-\d{2}$/, // 2024-01-01
            /^\d{4}\/\d{2}\/\d{2}$/, // 2024/01/01
            /^\d{2}\/\d{2}\/\d{4}$/, // 01/01/2024
            /^\d{4}-\d{2}$/, // 2024-01
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, // ISO format
        ];
        return datePatterns.some(pattern => pattern.test(value)) && !isNaN(Date.parse(value));
    }
    static createFieldMeta(fieldName, type, values, options) {
        const stats = this.calculateFieldStats(values);
        let role;
        if (type === 'number') {
            // 数值类型的角色推断
            if (options === null || options === void 0 ? void 0 : options.numericRoleHint) {
                role = options.numericRoleHint(fieldName, values);
            }
            else {
                // 默认推断规则
                role = this.inferNumericRole(fieldName, values, stats);
            }
        }
        else {
            role = 'dimension';
        }
        return {
            name: fieldName,
            type,
            role,
            nullable: stats.nullCount > 0,
            unique: stats.uniqueCount === stats.count,
            aggregation: role === 'measure' ? ((options === null || options === void 0 ? void 0 : options.defaultAggregation) || 'sum') : undefined,
            isDiscrete: role === 'dimension'
        };
    }
    static inferNumericRole(fieldName, values, stats) {
        const fieldLower = fieldName.toLowerCase();
        // 基于字段名的启发式规则
        const dimensionKeywords = ['id', 'year', 'month', 'day', 'code', 'number', 'rank', 'level', 'grade'];
        const measureKeywords = ['amount', 'count', 'sum', 'total', 'avg', 'mean', 'price', 'cost', 'value', 'score', 'rate', 'percent', 'sales', 'profit', 'revenue'];
        if (dimensionKeywords.some(keyword => fieldLower.includes(keyword))) {
            return 'dimension';
        }
        if (measureKeywords.some(keyword => fieldLower.includes(keyword))) {
            return 'measure';
        }
        // 基于数据特征的推断
        const uniqueRatio = stats.uniqueCount / stats.count;
        // 如果唯一值比例很高，可能是维度（如ID、编码等）
        if (uniqueRatio > 0.9) {
            return 'dimension';
        }
        // 如果唯一值很少，但是数值范围小，可能是维度（如等级、评分等）
        if (uniqueRatio < 0.1 && stats.max && stats.min && (stats.max - stats.min) < 10) {
            return 'dimension';
        }
        // 对于常见的业务数值（销售额、利润等），默认为指标
        return 'measure';
    }
    static calculateFieldStats(values) {
        const nonNullValues = values.filter(v => v != null);
        const uniqueValues = new Set(nonNullValues);
        const stats = {
            count: values.length,
            nullCount: values.length - nonNullValues.length,
            uniqueCount: uniqueValues.size
        };
        if (nonNullValues.length > 0) {
            // 数值类型的统计
            const numericValues = nonNullValues.filter(v => typeof v === 'number' && !isNaN(v));
            if (numericValues.length === nonNullValues.length) {
                stats.min = Math.min(...numericValues);
                stats.max = Math.max(...numericValues);
                stats.mean = numericValues.reduce((sum, v) => sum + v, 0) / numericValues.length;
                const sorted = [...numericValues].sort((a, b) => a - b);
                const mid = Math.floor(sorted.length / 2);
                stats.median = sorted.length % 2 === 0
                    ? (sorted[mid - 1] + sorted[mid]) / 2
                    : sorted[mid];
            }
            else {
                // 非数值类型的最小值和最大值
                const sortedValues = [...nonNullValues].sort();
                stats.min = sortedValues[0];
                stats.max = sortedValues[sortedValues.length - 1];
            }
        }
        return stats;
    }
    // 获取字段的所有唯一值（用于替代原来的values数组）
    static getFieldValues(fieldName, rows) {
        return [...new Set(rows.map(row => row[fieldName]).filter(v => v != null))];
    }
    // 获取字段的统计信息
    static getFieldStats(fieldName, rows) {
        const values = rows.map(row => row[fieldName]);
        return this.calculateFieldStats(values);
    }
}
exports.DataProcessor = DataProcessor;
//# sourceMappingURL=DataProcessor.js.map