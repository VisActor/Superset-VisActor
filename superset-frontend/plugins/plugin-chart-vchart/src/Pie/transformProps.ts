import { ChartProps, DataRecord } from '@superset-ui/core';
import { PieChartTransformedProps } from './types';

export default function transformProps(chartProps: ChartProps): PieChartTransformedProps {
  const { width, height, formData, queriesData } = chartProps;
  const { groupby, metric, colorScheme, showLabels = true, showLegend = true } = formData;
  const data = queriesData[0].data as DataRecord[];

  // 转换数据为 VChart 饼图所需格式
  const transformedData = data.map(item => ({
    name: groupby.map(col => item[col]).join(' - '),
    value: item[metric]
  }));

  // 构建 VChart 饼图配置
  const vchartSpec = {
    type: 'pie',
    data: transformedData,
    width,
    height,
    series: [
      {
        type: 'pie',
        data: {
          values: transformedData
        },
        encode: {
          value: 'value',
          name: 'name'
        },
        radius: 0.8,
        innerRadius: 0,
        padAngle: 0,
        label: {
          visible: showLabels,
          position: 'outside'
        }
      }
    ],
    color: colorScheme,
    legends: showLegend ? [
      {
        type: 'discrete',
        orient: 'right'
      }
    ] : []
  };

  return {
    width,
    height,
    vchartSpec
  };
}
