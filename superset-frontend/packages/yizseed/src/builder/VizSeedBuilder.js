"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VizSeedBuilder = void 0;
const charts_1 = require("../types/charts");
const visualStyleDefaults_1 = require("../config/visualStyleDefaults");
const DataSet_1 = require("../datasets/DataSet");
const PipelineRegistry_1 = require("../pipeline/PipelineRegistry");
const radash_1 = require("radash");
class VizSeedBuilder {
    constructor(dataOrRows, options) {
        this.fieldSelection = {
            dimensions: [],
            measures: [],
            groupMeasure: [],
            rowDimensions: [],
            columnDimensions: [],
            indicatorChartSpecs: {}
        };
        this.fieldMap = {};
        this.data = []; // 新增data
        this.chartType = charts_1.ChartType.BAR;
        this.encodes = [];
        this.visualStyle = (0, visualStyleDefaults_1.createDefaultVisualStyle)();
        this.theme = 'light'; // 默认主题
        this.version = '1.0.0'; // 默认版本信息
        this.vizSeedDSL = null; // 缓存构建结果
        if (Array.isArray(dataOrRows)) {
            // 直接传入rows数组的情况
            this.dataset = new DataSet_1.DataSet(dataOrRows, options);
        }
        else {
            // 传入DataSet对象的情况
            this.dataset = dataOrRows;
        }
    }
    // 根据字段名从DataSet创建字段定义
    createFieldDefinition(fieldName) {
        const field = this.dataset.fields.find(f => f.name === fieldName);
        if (!field) {
            throw new Error(`字段 ${fieldName} 不存在于数据集中`);
        }
        return {
            id: field.name,
            type: field.type,
            alias: field.name, // 默认使用字段名作为别名
            location: field.role,
            domain: this.extractFieldDomain(field.name),
            format: {}
        };
    }
    // 提取字段的域值
    extractFieldDomain(fieldName) {
        const values = this.dataset.rows.map(row => row[fieldName]);
        return [...new Set(values)].slice(0, 10); // 最多10个示例值
    }
    // 将字段添加到fieldMap中
    addFieldToMap(fieldName) {
        if (!this.fieldMap[fieldName]) {
            this.fieldMap[fieldName] = this.createFieldDefinition(fieldName);
        }
    }
    // 静态方法：从VizSeed DSL对象创建Builder
    static from(vizSeedDSL) {
        // 深拷贝整个vizSeedDSL对象
        const clonedDSL = JSON.parse(JSON.stringify(vizSeedDSL));
        // 从DSL数据创建Builder实例
        const builder = new VizSeedBuilder(clonedDSL.data || []);
        // 直接设置缓存的vizSeedDSL
        builder.vizSeedDSL = clonedDSL;
        return builder;
    }
    // 获取数据集信息
    getDataSet() {
        return this.dataset;
    }
    // 获取所有可用字段（从 DataSet）
    getAvailableFields() {
        return this.dataset.fields.map(f => f.name);
    }
    // 获取可用维度字段（从 DataSet）
    getAvailableDimensions() {
        return this.dataset.fields.filter(f => f.role === 'dimension').map(f => f.name);
    }
    // 获取可用指标字段（从 DataSet）
    getAvailableMeasures() {
        return this.dataset.fields.filter(f => f.role === 'measure').map(f => f.name);
    }
    // 获取当前选中的字段（从 fieldMap）
    getSelectedFields() {
        return Object.keys(this.fieldMap);
    }
    // 字段选择API - 选择同时自动添加到fieldMap和更新data
    setDimensions(dimensions) {
        this.fieldSelection.dimensions = [...dimensions];
        // 将选中的维度字段添加到fieldMap
        dimensions.forEach(dim => this.addFieldToMap(dim));
        // 更新data以包含选定字段的数据
        this.updateDataMap();
        return this;
    }
    setMeasures(measures) {
        let flattenedMeasures = measures.flat(5);
        this.fieldSelection.measures = flattenedMeasures; // 扁平化嵌套的指标数组
        this.fieldSelection.groupMeasure = measures;
        // 将选中的指标字段添加到fieldMap
        flattenedMeasures.forEach(flattenedMeasures => this.addFieldToMap(flattenedMeasures));
        // 更新data以包含选定字段的数据
        this.updateDataMap();
        return this;
    }
    addDimensionToArray(dimension) {
        if (!this.fieldSelection.dimensions.includes(dimension)) {
            this.fieldSelection.dimensions.push(dimension);
            // 添加到fieldMap
            this.addFieldToMap(dimension);
            // 更新data
            this.updateDataMap();
        }
        return this;
    }
    addMeasureToArray(measure) {
        if (!this.fieldSelection.measures.includes(measure)) {
            this.fieldSelection.measures.push(measure);
            // 添加到fieldMap
            this.addFieldToMap(measure);
            // 更新data
            this.updateDataMap();
        }
        return this;
    }
    getDimensions() {
        return [...this.fieldSelection.dimensions];
    }
    getMeasures() {
        return [...this.fieldSelection.measures];
    }
    // PivotChart专用API - 配置指标的图表规范
    setIndicatorChart(indicatorName, vizSeedDSL) {
        // 确保indicatorChartSpecs对象存在
        if (!this.fieldSelection.indicatorChartSpecs) {
            this.fieldSelection.indicatorChartSpecs = {};
        }
        // 直接使用传入的VizSeedDSL创建新的builder来生成spec
        const chartSpec = VizSeedBuilder.from(vizSeedDSL).buildSpec();
        this.fieldSelection.indicatorChartSpecs[indicatorName] = chartSpec;
        return this;
    }
    getIndicatorChartSpecs() {
        return Object.assign({}, this.fieldSelection.indicatorChartSpecs);
    }
    // 行列维度API - 用于表格和透视表等需要区分行列的图表
    setRowDimensions(rowDimensions) {
        this.fieldSelection.rowDimensions = [...rowDimensions];
        // 将选中的行维度字段添加到fieldMap
        rowDimensions.forEach(dim => this.addFieldToMap(dim));
        // 更新data以包含选定字段的数据
        this.updateDataMap();
        return this;
    }
    setColumnDimensions(columnDimensions) {
        this.fieldSelection.columnDimensions = [...columnDimensions];
        // 将选中的列维度字段添加到fieldMap
        columnDimensions.forEach(dim => this.addFieldToMap(dim));
        // 更新data以包含选定字段的数据
        this.updateDataMap();
        return this;
    }
    addRowDimensionToArray(dimension) {
        if (!this.fieldSelection.rowDimensions) {
            this.fieldSelection.rowDimensions = [];
        }
        if (!this.fieldSelection.rowDimensions.includes(dimension)) {
            this.fieldSelection.rowDimensions.push(dimension);
            // 添加到fieldMap
            this.addFieldToMap(dimension);
            // 更新data
            this.updateDataMap();
        }
        return this;
    }
    addColumnDimensionToArray(dimension) {
        if (!this.fieldSelection.columnDimensions) {
            this.fieldSelection.columnDimensions = [];
        }
        if (!this.fieldSelection.columnDimensions.includes(dimension)) {
            this.fieldSelection.columnDimensions.push(dimension);
            // 添加到fieldMap
            this.addFieldToMap(dimension);
            // 更新data
            this.updateDataMap();
        }
        return this;
    }
    getRowDimensions() {
        return [...(this.fieldSelection.rowDimensions || [])];
    }
    getColumnDimensions() {
        return [...(this.fieldSelection.columnDimensions || [])];
    }
    // FieldMap相关API
    getFieldMap() {
        return Object.assign({}, this.fieldMap);
    }
    setFieldMap(fieldMap) {
        this.fieldMap = Object.assign({}, fieldMap);
        return this;
    }
    getFieldSelection() {
        return Object.assign({}, this.fieldSelection);
    }
    setFieldSelection(fieldSelection) {
        this.fieldSelection = Object.assign({}, fieldSelection);
        return this;
    }
    // 更新字段别名
    setFieldAlias(fieldId, alias) {
        const field = this.fieldMap[fieldId];
        if (field) {
            field.alias = alias;
        }
        else if (this.hasField(fieldId)) {
            // 如果字段存在于DataSet但不在fieldMap中，先添加再设置别名
            this.addFieldToMap(fieldId);
            const newField = this.fieldMap[fieldId];
            if (newField) {
                newField.alias = alias;
            }
        }
        else {
            throw new Error(`字段 ${fieldId} 不存在于数据集中`);
        }
        return this;
    }
    // 获取所有可用字段名称（从 DataSet）
    getAvailableFieldNames() {
        return this.dataset.fields.map(f => f.name);
    }
    // 检查字段是否存在
    hasField(fieldName) {
        return this.dataset.fields.some(f => f.name === fieldName);
    }
    // 更新data以包含所有原始数据
    updateDataMap() {
        // 直接使用所有原始数据，不进行字段过滤
        this.data = this.dataset.rows;
    }
    setChartType(type) {
        let chartType;
        if (typeof type === 'string') {
            // 使用Zod转换字符串为枚举
            try {
                chartType = (0, charts_1.parseChartType)(type);
            }
            catch (error) {
                throw new Error(`不支持的图表类型: '${type}'. 支持的类型: bar, bar_stacked, bar_grouped, bar_percent, column, line, area, scatter, pie, donut, table`);
            }
        }
        else {
            chartType = type;
        }
        if (!charts_1.CHART_DATA_REQUIREMENTS[chartType]) {
            throw new Error(`不支持的图表类型: ${chartType}`);
        }
        this.chartType = chartType;
        return this;
    }
    // 所有视觉通道设置方法已删除 - 现在使用自动通道映射
    setTitle(title) {
        this.visualStyle.title = title;
        return this;
    }
    setLegend(visible = true) {
        this.visualStyle.legend.visible = visible;
        return this;
    }
    setLabel(visible = true) {
        this.visualStyle.label.visible = visible;
        return this;
    }
    setTooltip(visible = true) {
        this.visualStyle.tooltip.visible = visible;
        return this;
    }
    setStyle(styleOptions) {
        // 使用radash的assign进行深度合并，数组会被直接替换而不是合并
        this.visualStyle = (0, radash_1.assign)(this.visualStyle, styleOptions);
        return this;
    }
    build() {
        // 如果已经缓存了结果，直接返回
        if (this.vizSeedDSL) {
            return this.vizSeedDSL;
        }
        // 强化前置验证 - 要求用户必须设置足够的字段
        this.validateFieldRequirements();
        // 使用简化的Pipeline构建VizSeed对象
        const context = {
            chartType: this.chartType, // 图表类型
            encodes: this.encodes, // 映射通道配置
            fieldMap: this.fieldMap,
            fieldSelection: this.fieldSelection,
            data: this.data,
            visualStyle: this.visualStyle,
            theme: this.theme,
            version: this.version
        };
        // 构建并缓存结果
        this.vizSeedDSL = (0, PipelineRegistry_1.buildVizSeed)(context.chartType, context);
        return this.vizSeedDSL;
    }
    buildSpec() {
        try {
            // 确保已构建vizSeedDSL
            if (!this.vizSeedDSL) {
                this.build();
            }
            // 直接使用缓存的vizSeedDSL作为规范上下文
            const specContext = {
                chartType: this.vizSeedDSL.chartType, // 图表类型
                encodes: this.vizSeedDSL.encodes, // 映射通道配置
                fieldMap: this.vizSeedDSL.fieldMap,
                fieldSelection: {
                    dimensions: this.vizSeedDSL.dimensions,
                    measures: this.vizSeedDSL.measures,
                    groupMeasure: this.vizSeedDSL.groupMeasure,
                    rowDimensions: this.vizSeedDSL.rowDimensions,
                    columnDimensions: this.vizSeedDSL.columnDimensions,
                    indicatorChartSpecs: this.vizSeedDSL.indicatorChartSpecs // 从vizSeedDSL中获取
                },
                data: this.vizSeedDSL.data,
                visualStyle: this.vizSeedDSL.style,
                theme: this.vizSeedDSL.theme,
                version: this.vizSeedDSL.version
            };
            // 使用简化的pipeline构建规范
            return (0, PipelineRegistry_1.buildSpec)(specContext.chartType, specContext);
        }
        catch (error) {
            throw new Error(`构建图表规范失败: ${error.message}`);
        }
    }
    validateFieldRequirements() {
        if (!this.chartType) {
            throw new Error('图表类型未设置，请先调用 setChartType()');
        }
        const chartType = this.chartType;
        const { dimensions, measures } = this.fieldSelection;
        const totalFields = dimensions.length + measures.length;
        // 检查用户是否设置了字段
        if (totalFields === 0) {
            throw new Error(`请先设置字段，调用 setDimensions() 和 setMeasures() 方法`);
        }
        // 检查指标数量：如果指标为0且不是特殊图表类型，则抛出错误
        if (measures.length === 0) {
            const allowedTypesWithoutMeasures = ['wordcloud', 'listtable'];
            if (!allowedTypesWithoutMeasures.includes(chartType)) {
                throw new Error(`${chartType}图表需要添加相应的指标字段，请调用 setMeasures() 或 addMeasureToArray() 方法添加指标`);
            }
        }
    }
}
exports.VizSeedBuilder = VizSeedBuilder;
//# sourceMappingURL=VizSeedBuilder.js.map