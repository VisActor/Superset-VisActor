"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHART_DATA_REQUIREMENTS = exports.ChartTypeSchema = exports.ChartType = void 0;
exports.parseChartType = parseChartType;
const zod_1 = require("zod");
var ChartType;
(function (ChartType) {
    ChartType["BAR"] = "bar";
    ChartType["BAR_STACKED"] = "bar_stacked";
    ChartType["BAR_GROUPED"] = "bar_grouped";
    ChartType["BAR_PERCENT"] = "bar_percent";
    ChartType["COLUMN"] = "column";
    ChartType["COLUMN_STACKED"] = "column_stacked";
    ChartType["COLUMN_GROUPED"] = "column_grouped";
    ChartType["COLUMN_PERCENT"] = "column_percent";
    ChartType["LINE"] = "line";
    ChartType["AREA"] = "area";
    ChartType["AREA_STACKED"] = "area_stacked";
    ChartType["AREA_PERCENT"] = "area_percent";
    ChartType["SCATTER"] = "scatter";
    ChartType["PIE"] = "pie";
    ChartType["DONUT"] = "donut";
    ChartType["TABLE"] = "table";
    ChartType["PIVOT_TABLE"] = "pivottable";
    ChartType["PIVOT_CHART"] = "pivotchart"; // 透视图
})(ChartType || (exports.ChartType = ChartType = {}));
// Zod schema用于验证和转换字符串为ChartType枚举
exports.ChartTypeSchema = zod_1.z.enum([
    'bar', 'bar_stacked', 'bar_grouped', 'bar_percent', 'column', 'column_stacked', 'column_grouped', 'column_percent', 'line', 'area', 'area_stacked', 'area_percent', 'scatter', 'pie', 'donut', 'table', 'pivottable', 'pivotchart'
]).transform((value) => {
    // 将字符串转换为对应的枚举值
    const enumMap = {
        'bar': ChartType.BAR,
        'bar_stacked': ChartType.BAR_STACKED,
        'bar_grouped': ChartType.BAR_GROUPED,
        'bar_percent': ChartType.BAR_PERCENT,
        'column': ChartType.COLUMN,
        'column_stacked': ChartType.COLUMN_STACKED,
        'column_grouped': ChartType.COLUMN_GROUPED,
        'column_percent': ChartType.COLUMN_PERCENT,
        'line': ChartType.LINE,
        'area': ChartType.AREA,
        'area_stacked': ChartType.AREA_STACKED,
        'area_percent': ChartType.AREA_PERCENT,
        'scatter': ChartType.SCATTER,
        'pie': ChartType.PIE,
        'donut': ChartType.DONUT,
        'table': ChartType.TABLE,
        'pivottable': ChartType.PIVOT_TABLE,
        'pivotchart': ChartType.PIVOT_CHART
    };
    return enumMap[value];
});
// 便捷函数：将字符串转换为ChartType枚举
function parseChartType(input) {
    return exports.ChartTypeSchema.parse(input);
}
// 图表类型数据要求配置
exports.CHART_DATA_REQUIREMENTS = {
    bar: {
        channels: {
            dimensionChannels: ['x', 'color'],
            measureChannels: ['y']
        },
        idealDimensions: 1,
        idealMeasures: 1,
        minDimensions: 1,
        minMeasures: 1,
        chartType: 'bar'
    },
    bar_stacked: {
        channels: {
            dimensionChannels: ['x', 'color'],
            measureChannels: ['y']
        },
        idealDimensions: 2,
        idealMeasures: 1,
        minDimensions: 2,
        minMeasures: 1,
        chartType: 'bar_stacked'
    },
    bar_grouped: {
        channels: {
            dimensionChannels: ['x', 'color'],
            measureChannels: ['y']
        },
        idealDimensions: 2,
        idealMeasures: 1,
        minDimensions: 2,
        minMeasures: 1,
        chartType: 'bar_grouped'
    },
    bar_percent: {
        channels: {
            dimensionChannels: ['x', 'color'],
            measureChannels: ['y']
        },
        idealDimensions: 2,
        idealMeasures: 1,
        minDimensions: 2,
        minMeasures: 1,
        chartType: 'bar_percent'
    },
    column: {
        channels: {
            dimensionChannels: ['x', 'color'],
            measureChannels: ['y']
        },
        idealDimensions: 1,
        idealMeasures: 1,
        minDimensions: 1,
        minMeasures: 1,
        chartType: 'column'
    },
    column_stacked: {
        channels: {
            dimensionChannels: ['x', 'color'],
            measureChannels: ['y']
        },
        idealDimensions: 2,
        idealMeasures: 1,
        minDimensions: 2,
        minMeasures: 1,
        chartType: 'column_stacked'
    },
    column_grouped: {
        channels: {
            dimensionChannels: ['x', 'color'],
            measureChannels: ['y']
        },
        idealDimensions: 2,
        idealMeasures: 1,
        minDimensions: 2,
        minMeasures: 1,
        chartType: 'column_grouped'
    },
    column_percent: {
        channels: {
            dimensionChannels: ['x', 'color'],
            measureChannels: ['y']
        },
        idealDimensions: 2,
        idealMeasures: 1,
        minDimensions: 2,
        minMeasures: 1,
        chartType: 'column_percent'
    },
    line: {
        channels: {
            dimensionChannels: ['x', 'color'],
            measureChannels: ['y']
        },
        idealDimensions: 1,
        idealMeasures: 1,
        minDimensions: 1,
        minMeasures: 1,
        chartType: 'line'
    },
    area: {
        channels: {
            dimensionChannels: ['x', 'color'],
            measureChannels: ['y']
        },
        idealDimensions: 1,
        idealMeasures: 1,
        minDimensions: 1,
        minMeasures: 1,
        chartType: 'area'
    },
    area_stacked: {
        channels: {
            dimensionChannels: ['x', 'color'],
            measureChannels: ['y']
        },
        idealDimensions: 2,
        idealMeasures: 1,
        minDimensions: 2,
        minMeasures: 1,
        chartType: 'area_stacked'
    },
    area_percent: {
        channels: {
            dimensionChannels: ['x', 'color'],
            measureChannels: ['y']
        },
        idealDimensions: 2,
        idealMeasures: 1,
        minDimensions: 2,
        minMeasures: 1,
        chartType: 'area_percent'
    },
    scatter: {
        channels: {
            dimensionChannels: ['color'],
            measureChannels: ['x', 'y']
        },
        idealDimensions: 0,
        idealMeasures: 2,
        minDimensions: 0,
        minMeasures: 2,
        chartType: 'scatter'
    },
    pie: {
        channels: {
            dimensionChannels: ['category'],
            measureChannels: ['value']
        },
        idealDimensions: 1,
        idealMeasures: 1,
        minDimensions: 1,
        minMeasures: 1,
        chartType: 'pie'
    },
    donut: {
        channels: {
            dimensionChannels: ['category'],
            measureChannels: ['value']
        },
        idealDimensions: 1,
        idealMeasures: 1,
        minDimensions: 1,
        minMeasures: 1,
        chartType: 'donut'
    },
    table: {
        channels: {
            dimensionChannels: ['rowDimension', 'columnDimension'],
            measureChannels: ['measure']
        },
        idealDimensions: 1,
        idealMeasures: 1,
        minDimensions: 0,
        minMeasures: 0,
        chartType: 'table'
    },
    pivottable: {
        channels: {
            dimensionChannels: ['rowDimension', 'columnDimension'],
            measureChannels: ['measure']
        },
        idealDimensions: 2,
        idealMeasures: 1,
        minDimensions: 1,
        minMeasures: 1,
        chartType: 'pivottable'
    },
    pivotchart: {
        channels: {
            dimensionChannels: ['rowDimension', 'columnDimension'],
            measureChannels: ['measure']
        },
        idealDimensions: 2,
        idealMeasures: 1,
        minDimensions: 1,
        minMeasures: 1,
        chartType: 'pivotchart'
    }
};
//# sourceMappingURL=charts.js.map