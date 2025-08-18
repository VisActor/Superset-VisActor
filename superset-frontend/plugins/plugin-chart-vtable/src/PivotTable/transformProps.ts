import { ChartProps, DataRecord } from '@superset-ui/core';
import { PivotTableConstructorOptions, TYPES } from '@visactor/vtable';
import { PivotTableTransformedProps } from './types';
import { VizSeedBuilder } from 'yizseed'


// TODO 需要将自定义配置再完善
/**
 * 将Superset的chartProps转换为VTable的配置选项
 * @param chartProps - Superset图表属性
 * @returns 转换后的VTable配置
 */
export default function transformProps(chartProps: ChartProps): PivotTableTransformedProps {
  const { width, height, formData, queriesData } = chartProps;
  const {
    groupbyRows = [],
    groupbyColumns = [],
    metrics = [],
    colOrder = 'key_a_to_z',
    rowOrder = 'key_a_to_z',
    rowTotals = false,
    colTotals = false,
    rowSubTotals = false,
    colSubTotals = false,
    metricsLayout = 'COLUMNS'
  } = formData;

  const data = queriesData[0].data as DataRecord[];
  console.log('debug', chartProps);

  const builder = new VizSeedBuilder(data);
  const vizSeedDSL = builder
    .setChartType('pivottable')
    .setRowDimensions(groupbyRows)    // 行维度：地区、产品
    .setColumnDimensions(groupbyColumns)   // 列维度：年份、季度
    .setMeasures(metrics.map((metric: any) => metric.label))           // 指标：销售额、利润
    .setStyle({
      theme: 'DEFAULT',
      autoWrapText: true,
      corner: {
        titleOnDimension: 'row'
      }
    })
    .build();
  let vtableSpec: PivotTableConstructorOptions = VizSeedBuilder.from(vizSeedDSL).buildSpec();





  const sortRules: any = [
    // 行维度排序 - 对每个行维度应用排序规则
    ...groupbyRows.map((field: string) => ({
      sortField: field,
      sortType: rowOrder === 'key_a_to_z' ? TYPES.SortType.ASC : TYPES.SortType.DESC
    })),
    // 列维度排序 - 对每个列维度应用排序规则
    ...groupbyColumns.map((field: string) => ({
      sortField: field,
      sortType: colOrder === 'key_a_to_z' ? TYPES.SortType.ASC : TYPES.SortType.DESC
    }))
  ];
  vtableSpec = {
    ...vtableSpec,
    indicatorsAsCol: metricsLayout === 'COLUMNS',
    dataConfig: {
      sortRules,
      totals: {
        row:{
          showGrandTotals: rowTotals,
          showSubTotals: rowSubTotals,
          subTotalsDimensions: groupbyRows.length > 0 ? [groupbyRows[0]] : undefined 
        },
        column: {
          showGrandTotals: colTotals,
          showSubTotals: colSubTotals,
          subTotalsDimensions: groupbyColumns.length > 0 ? [groupbyColumns[0]] : undefined
        }
      }
    }

  };



  return {
    width,
    height,
    vtableOption: vtableSpec
  };
}
