"use strict";
/**
 * Pipeline注册表
 * 使用函数映射实现图表Pipeline管理，简洁高效的架构
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPipelineSupported = exports.getSupportedPipelineTypes = exports.buildVizSeed = exports.buildSpec = void 0;
const charts_1 = require("../types/charts");
// 静态导入所有spec pipelines
const SpecPipelines = __importStar(require("./spec/specPipelines"));
// 静态导入所有vizSeed pipelines  
const VizSeedPipelines = __importStar(require("./vizSeed/vizSeedPipelines"));
// 规范生成Pipeline映射表 - 每个图表类型使用专门的Pipeline
const specPipelineMap = {
    // VChart基础图表类型
    [charts_1.ChartType.BAR]: SpecPipelines.createBarSpecPipeline,
    [charts_1.ChartType.BAR_STACKED]: SpecPipelines.createBarStackedSpecPipeline,
    [charts_1.ChartType.BAR_GROUPED]: SpecPipelines.createBarGroupedSpecPipeline,
    [charts_1.ChartType.BAR_PERCENT]: SpecPipelines.createBarPercentSpecPipeline,
    [charts_1.ChartType.COLUMN]: SpecPipelines.createColumnSpecPipeline,
    [charts_1.ChartType.COLUMN_STACKED]: SpecPipelines.createColumnStackedSpecPipeline,
    [charts_1.ChartType.COLUMN_GROUPED]: SpecPipelines.createColumnGroupedSpecPipeline,
    [charts_1.ChartType.COLUMN_PERCENT]: SpecPipelines.createColumnPercentSpecPipeline,
    [charts_1.ChartType.LINE]: SpecPipelines.createLineSpecPipeline,
    [charts_1.ChartType.AREA]: SpecPipelines.createAreaSpecPipeline,
    [charts_1.ChartType.AREA_STACKED]: SpecPipelines.createAreaStackedSpecPipeline,
    [charts_1.ChartType.AREA_PERCENT]: SpecPipelines.createAreaPercentSpecPipeline,
    [charts_1.ChartType.SCATTER]: SpecPipelines.createScatterSpecPipeline,
    // VChart饼图类型
    [charts_1.ChartType.PIE]: SpecPipelines.createPieSpecPipeline,
    [charts_1.ChartType.DONUT]: SpecPipelines.createDonutSpecPipeline,
    // VTable表格类型
    [charts_1.ChartType.TABLE]: SpecPipelines.createTableSpecPipeline,
    [charts_1.ChartType.PIVOT_TABLE]: SpecPipelines.createPivotTableSpecPipeline,
    [charts_1.ChartType.PIVOT_CHART]: SpecPipelines.createPivotChartSpecPipeline
};
// VizSeed构建Pipeline映射表 - 每个图表类型使用专门的Pipeline
const vizSeedPipelineMap = {
    // VChart基础图表类型
    [charts_1.ChartType.BAR]: VizSeedPipelines.createBarVizSeedPipeline,
    [charts_1.ChartType.BAR_STACKED]: VizSeedPipelines.createBarVizSeedPipeline,
    [charts_1.ChartType.BAR_GROUPED]: VizSeedPipelines.createBarVizSeedPipeline,
    [charts_1.ChartType.BAR_PERCENT]: VizSeedPipelines.createBarVizSeedPipeline,
    [charts_1.ChartType.COLUMN]: VizSeedPipelines.createColumnVizSeedPipeline,
    [charts_1.ChartType.COLUMN_STACKED]: VizSeedPipelines.createColumnVizSeedPipeline,
    [charts_1.ChartType.COLUMN_GROUPED]: VizSeedPipelines.createColumnVizSeedPipeline,
    [charts_1.ChartType.COLUMN_PERCENT]: VizSeedPipelines.createColumnVizSeedPipeline,
    [charts_1.ChartType.LINE]: VizSeedPipelines.createLineVizSeedPipeline,
    [charts_1.ChartType.AREA]: VizSeedPipelines.createAreaVizSeedPipeline,
    [charts_1.ChartType.AREA_STACKED]: VizSeedPipelines.createAreaVizSeedPipeline,
    [charts_1.ChartType.AREA_PERCENT]: VizSeedPipelines.createAreaVizSeedPipeline,
    [charts_1.ChartType.SCATTER]: VizSeedPipelines.createScatterVizSeedPipeline,
    // VChart饼图类型
    [charts_1.ChartType.PIE]: VizSeedPipelines.createPieVizSeedPipeline,
    [charts_1.ChartType.DONUT]: VizSeedPipelines.createDonutVizSeedPipeline,
    // VTable表格类型
    [charts_1.ChartType.TABLE]: VizSeedPipelines.createTableVizSeedPipeline,
    [charts_1.ChartType.PIVOT_TABLE]: VizSeedPipelines.createPivotTableVizSeedPipeline,
    [charts_1.ChartType.PIVOT_CHART]: VizSeedPipelines.createPivotChartVizSeedPipeline
};
// 简化的构建规范函数 - 同步版本
const buildSpec = (chartType, context) => {
    const selectedPipeline = specPipelineMap[chartType];
    if (!selectedPipeline) {
        throw new Error(`不支持的图表类型: ${chartType}`);
    }
    try {
        return selectedPipeline()(context);
    }
    catch (error) {
        throw new Error(`加载图表类型 ${chartType} 失败: ${error}`);
    }
};
exports.buildSpec = buildSpec;
// 构建VizSeed对象的函数 - 同步版本
const buildVizSeed = (chartType, context) => {
    const vizSeedPipeline = vizSeedPipelineMap[chartType];
    if (!vizSeedPipeline) {
        throw new Error(`不支持的VizSeed图表类型: ${chartType}`);
    }
    try {
        return vizSeedPipeline()(context);
    }
    catch (error) {
        throw new Error(`加载VizSeed图表类型 ${chartType} 失败: ${error}`);
    }
};
exports.buildVizSeed = buildVizSeed;
// 获取所有支持的pipeline类型
const getSupportedPipelineTypes = () => {
    return [...Object.keys(specPipelineMap), ...Object.keys(vizSeedPipelineMap)];
};
exports.getSupportedPipelineTypes = getSupportedPipelineTypes;
// 检查pipeline是否支持
const isPipelineSupported = (key) => {
    return key in specPipelineMap || key in vizSeedPipelineMap;
};
exports.isPipelineSupported = isPipelineSupported;
//# sourceMappingURL=PipelineRegistry.js.map