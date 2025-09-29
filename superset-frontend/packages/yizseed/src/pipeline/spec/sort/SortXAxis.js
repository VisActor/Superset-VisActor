"use strict";
/**
 * 给Line和Area配置Sort来正确显示
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortXAxis = void 0;
// X轴排序配置步骤
const SortXAxis = (spec, _context) => {
    // 如果没有data或xField，直接返回
    if (!spec.data || !spec.xField || !Array.isArray(spec.data)) {
        return spec;
    }
    // 获取xField名称
    const xFieldName = spec.xField;
    const seriesFieldName = spec.seriesField;
    // 修改data数组，给每个数据源添加fields配置
    const updatedData = spec.data.map((dataSource) => {
        return Object.assign(Object.assign({}, dataSource), { fields: Object.assign(Object.assign({}, dataSource.fields), { [xFieldName]: {
                    sortIndex: 0
                }, [seriesFieldName]: {
                    sortIndex: 1
                } }) });
    });
    return Object.assign(Object.assign({}, spec), { data: updatedData });
};
exports.SortXAxis = SortXAxis;
//# sourceMappingURL=SortXAxis.js.map