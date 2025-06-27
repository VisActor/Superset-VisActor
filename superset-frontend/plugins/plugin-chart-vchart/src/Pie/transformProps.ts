import { ChartProps, DataRecord , CategoricalColorNamespace} from '@superset-ui/core';
import { PieChartTransformedProps } from './types';

export default function transformProps(chartProps: ChartProps): PieChartTransformedProps {
  const {
    formData,
    height,
    queriesData,
    width,
  } = chartProps;
  const { groupby, metric, colorScheme, showLabels = true, showLegend = true , sliceId, outerRadius, innerRadius, donut, labelLine} = formData;
  const data = queriesData[0].data as DataRecord[];
  // 转换数据为 VChart 饼图所需格式
  
  const transformedData = data.map(item => ({
    name: groupby.map((col: string) => item[col]).join(' - '),
    value: item[metric]
  }));
  const colorFn = CategoricalColorNamespace.getScale(colorScheme as string);
  const color = data.map(datum => {
    const name = groupby.map((col: string) => datum[col]).join(' - ');
    return colorFn(name, sliceId);
  });

  // 构建 VChart 饼图配置
  const vchartSpec = {
    type: 'pie',
    data: transformedData,
    valueField: 'value',
    categoryField: 'name',
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
        radius: outerRadius / 100,
        innerRadius: donut ? innerRadius / 100 : 0,
        padAngle: 0,
        label: {
          line: {
            visible: labelLine,
          },
          visible: showLabels,
          position: 'outside'
        }
      }
    ],
    color,
    legends: showLegend ? [
      {
        type: 'discrete',
        orient: 'left'
      }
    ] : []
  };
  return {
    width,
    height,
    vchartSpec
  };
}
