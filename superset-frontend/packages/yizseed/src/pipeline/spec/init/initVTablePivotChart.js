"use strict";
/**
 * VTable透视图初始化模块
 * 支持在透视表单元格中嵌入VChart图表
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.initVTablePivotChart = void 0;
// VTable透视图初始化
const initVTablePivotChart = (spec, context) => {
    const { encodes, data, fieldSelection } = context;
    const indicatorChartSpecs = (fieldSelection === null || fieldSelection === void 0 ? void 0 : fieldSelection.indicatorChartSpecs) || {};
    if (!encodes || encodes.length === 0) {
        return Object.assign(Object.assign({}, spec), { records: data || [] });
    }
    const encode = encodes[0];
    const { rowDimension = [], columnDimension = [], measure = [] } = encode;
    // 构造透视图的rows配置（行维度）
    const rows = [];
    if (Array.isArray(rowDimension)) {
        rowDimension.forEach((fieldName) => {
            if (fieldName) {
                rows.push({
                    dimensionKey: fieldName,
                    title: fieldName
                });
            }
        });
    }
    // 构造透视图的columns配置（列维度）
    const columns = [];
    if (Array.isArray(columnDimension)) {
        columnDimension.forEach((fieldName) => {
            if (fieldName) {
                columns.push({
                    dimensionKey: fieldName,
                    title: fieldName
                });
            }
        });
    }
    // 构造透视图的indicators配置（指标 + 图表）
    const indicators = [];
    const recordsData = {}; // 存储每个指标的数据
    if (Array.isArray(measure)) {
        measure.forEach((fieldName, index) => {
            var _a;
            if (fieldName) {
                // 使用用户配置的完整图表规范，如果没有配置则使用默认配置
                let chartSpec;
                if (indicatorChartSpecs[fieldName]) {
                    // 使用用户提供的完整图表规范
                    chartSpec = Object.assign({}, indicatorChartSpecs[fieldName]);
                    // 提取数据到records中，并修改chartSpec中的data引用
                    if (chartSpec.data && Array.isArray(chartSpec.data) && ((_a = chartSpec.data[0]) === null || _a === void 0 ? void 0 : _a.values)) {
                        recordsData[fieldName] = chartSpec.data[0].values;
                        // 修改为引用records中的数据
                        chartSpec.data = {
                            id: fieldName
                        };
                    }
                }
                else {
                    // 使用默认的简单配置
                    const chartType = ['bar', 'line', 'area'][index % 3];
                    chartSpec = Object.assign(Object.assign({ type: chartType, data: {
                            id: fieldName, // 使用指标名作为数据id
                            fields: {
                                [fieldName]: {
                                    alias: fieldName
                                }
                            }
                        } }, (chartType === 'bar' ? {
                        xField: '_indicatorKey',
                        yField: '_indicatorValue',
                        seriesField: '_indicatorKey'
                    } : chartType === 'line' ? {
                        xField: '_indicatorKey',
                        yField: '_indicatorValue',
                        point: { visible: true }
                    } : {
                        // area chart
                        xField: '_indicatorKey',
                        yField: '_indicatorValue',
                        stack: false
                    })), { axes: [
                            {
                                orient: 'bottom',
                                type: 'band'
                            },
                            {
                                orient: 'left',
                                type: 'linear'
                            }
                        ], theme: 'light' });
                    // 对于默认配置，也需要设置数据
                    recordsData[fieldName] = data || [];
                }
                indicators.push({
                    indicatorKey: fieldName,
                    title: fieldName,
                    width: 'auto',
                    cellType: 'chart',
                    chartModule: 'vchart',
                    chartSpec,
                    style: {
                        padding: 1
                    }
                });
            }
        });
    }
    return Object.assign(Object.assign({}, spec), { type: 'pivot-chart', rows,
        columns,
        indicators, indicatorsAsCol: false, records: Object.keys(recordsData).length > 0 ? recordsData : data || [], corner: {
            titleOnDimension: 'row'
        }, defaultRowHeight: 200, defaultHeaderRowHeight: 50, defaultColWidth: 280, defaultHeaderColWidth: 100, indicatorTitle: 'Indicator', autoWrapText: true });
};
exports.initVTablePivotChart = initVTablePivotChart;
//# sourceMappingURL=initVTablePivotChart.js.map