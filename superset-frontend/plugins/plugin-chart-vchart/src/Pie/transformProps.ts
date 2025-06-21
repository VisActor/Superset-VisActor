import { ChartProps, DataRecord } from '@superset-ui/core';
import { PieChartTransformedProps } from './types';

export default function transformProps(chartProps: ChartProps): PieChartTransformedProps {
  const { width, height, formData, queriesData } = chartProps;
  // const { groupby, metric, colorScheme, showLabels = true, showLegend = true } = formData;
  // const data = queriesData[0].data as DataRecord[];

  // 转换数据为 VChart 饼图所需格式
  // const transformedData = data.map(item => ({
  //   name: groupby.map(col => item[col]).join(' - '),
  //   value: item[metric]
  // }));

  // 构建 VChart 饼图配置
  // const vchartSpec = {
  //   type: 'pie',
  //   data: transformedData,
  //   width,
  //   height,
  //   series: [
  //     {
  //       type: 'pie',
  //       data: {
  //         values: transformedData
  //       },
  //       encode: {
  //         value: 'value',
  //         name: 'name'
  //       },
  //       radius: 0.8,
  //       innerRadius: 0,
  //       padAngle: 0,
  //       label: {
  //         visible: showLabels,
  //         position: 'outside'
  //       }
  //     }
  //   ],
  //   color: colorScheme,
  //   legends: showLegend ? [
  //     {
  //       type: 'discrete',
  //       orient: 'right'
  //     }
  //   ] : []
  // };
  const vchartSpec = {
    type: 'pie',
    data: [
      {
        id: 'id0',
        values: [
          { type: 'oxygen', value: '46.60' },
          { type: 'silicon', value: '27.72' },
          { type: 'aluminum', value: '8.13' },
          { type: 'iron', value: '5' },
          { type: 'calcium', value: '3.63' },
          { type: 'sodium', value: '2.83' },
          { type: 'potassium', value: '2.59' },
          { type: 'others', value: '3.5' }
        ]
      }
    ],
    outerRadius: 0.8,
    valueField: 'value',
    categoryField: 'type',
    title: {
      visible: true,
      text: 'Surface element content statistics'
    },
    legends: {
      visible: true,
      orient: 'left'
    },
    label: {
      visible: true
    },
    tooltip: {
      mark: {
        content: [
          {
            key: (datum: any) => datum['type'],
            value: (datum:any) => datum['value'] + '%'
          }
        ]
      }
    }
  };

  return {
    width,
    height,
    vchartSpec
  };
}
