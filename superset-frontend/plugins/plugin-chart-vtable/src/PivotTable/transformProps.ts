import { ChartProps, DataRecord } from '@superset-ui/core';
import { PivotTableConstructorOptions , TYPES} from '@visactor/vtable';
import { PivotTableTransformedProps } from './types';


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
    aggregateFunction = 'Sum'
  } = formData;
  
  const data = queriesData[0].data as DataRecord[];
  console.log('debug', chartProps);
  /**
   * 获取聚合函数的VTable格式
   * @param func - 聚合函数名称
   * @returns VTable支持的聚合函数
   */
  const getAggregationType = (func: string): string => {
    const funcMap: Record<string, string> = {
      'sum': 'SUM',
      'avg': 'AVERAGE', 
      'count': 'COUNT',
      'max': 'MAX',
      'min': 'MIN'
    };
    return funcMap[func.toLowerCase()] || 'SUM';
  };

  /**
   * 数值格式化函数
   * @param value - 数值
   * @returns 格式化后的字符串
   */
  const formatValue = (value: number): string => {
    if (value == null || isNaN(value)) return '';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // 构建行维度配置
  const rows = groupbyRows.map((field: any) => field);
  
  // 构建列维度配置
  const columns = groupbyColumns.map((field: any) => field);
  
  // 构建指标配置
  const indicators = metrics.map((metric: any) => ({
    indicatorKey: metric.label,
    title: metric.label,
    width: 'auto',
    showSort: true,
    headerStyle: {
      fontWeight: 'normal',
      bgColor: '#f8f9fa',
      color: '#333'
    },
    format: (value: number) => formatValue(value),
    style: {
      padding: [12, 16, 12, 16],
      color: (args: any) => {
        if (args.dataValue >= 0) return '#333';
        return '#dc3545'; // 负数显示红色
      },
      textAlign: 'right'
    }
  }));

  const sortRules: any = [
    // 行维度排序 - 对每个行维度应用排序规则
    ...rows.map((field: string) => ({
      sortField: field,
      sortType: rowOrder === 'key_a_to_z' ? TYPES.SortType.ASC : TYPES.SortType.DESC
    })),
    // 列维度排序 - 对每个列维度应用排序规则
    ...columns.map((field: string) => ({
      sortField: field, 
      sortType: colOrder === 'key_a_to_z' ? TYPES.SortType.ASC : TYPES.SortType.DESC
    }))
  ];

  
  // VTable 透视表配置
  const vtableOption: PivotTableConstructorOptions = {
    container: null, // 将在组件中设置
    records: data,
    rows,
    columns,
    indicators,
    corner: {
      titleOnDimension: 'row',
      headerStyle: {
        fontWeight: 'bold',
        bgColor: '#e9ecef',
        color: '#495057'
      }
    },
    widthMode: 'standard',
    defaultHeaderColWidth: 150,
    defaultColWidth: 120,
    defaultRowHeight: 40,
    rowHierarchyIndent: 20,
    rowHierarchyTextStartAlignment: true,
    theme: {
      headerStyle: {
        bgColor: '#f8f9fa',
        fontWeight: 'bold',
        color: '#495057',
        borderColor: '#dee2e6'
      },
      bodyStyle: {
        bgColor: '#ffffff',
        color: '#333',
        borderColor: '#dee2e6'
      },
      frameStyle: {
        borderColor: '#dee2e6',
        borderLineWidth: 1
      }
    },
    // 数据配置 - 正确的排序配置位置
    dataConfig: {
      // 排序规则配置
      sortRules,
      // 聚合规则配置
      aggregationRules: metrics.map((metric: any) => ({
        indicatorKey: metric,
        field: metric,
        aggregationType: getAggregationType(aggregateFunction),
        formatFun: formatValue
      }))
    },
    // 性能优化
    pagination: {
      perPageCount: 100
    }
  };
  
  return {
    width,
    height,
    vtableOption
  };
}
