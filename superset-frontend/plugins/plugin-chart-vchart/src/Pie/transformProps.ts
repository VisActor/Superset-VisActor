import { ChartProps, DataRecord, getCategoricalSchemeRegistry, getMetricLabel, getColumnLabel } from '@superset-ui/core';
import { PieChartTransformedProps } from './types';
import { Builder, registerAll } from '@visactor/vseed';

// Register all chart types and themes (idempotent, safe to call multiple times)
registerAll();

export default function transformProps(chartProps: ChartProps): PieChartTransformedProps {
  const {
    formData,
    height,
    queriesData,
    width,
  } = chartProps;
  const { groupby, metric, colorScheme, showLabels = true, showLegend = true, outerRadius, innerRadius, donut, labelLine } = formData;
  const data = queriesData[0].data as DataRecord[];

  const colors = getCategoricalSchemeRegistry().get(colorScheme)?.colors;

  const metricLabel = getMetricLabel(metric);
  const groupbyLabels = groupby.map(getColumnLabel);

  const chartType = donut ? 'donut' : 'pie';
  const vseed: any = {
    chartType: chartType,
    dataset: data,
    dimensions: groupbyLabels.map((label: string) => ({ id: label })),
    measures: [{ id: metricLabel }],
    label: {
      visible: showLabels,
      position: 'outside',
    },
    legend: showLegend ? { visible: true } : { visible: false },
  };

  const builder = new Builder(vseed);
  const vchartSpec = builder.build();



  // const colorFn = CategoricalColorNamespace.getScale(colorScheme as string);
  // console.log('colorFn', colorFn);
  // const color = data.map(datum => {
  //   const name = groupby.map((col: string) => datum[col]).join(' - ');
  //   return colorFn(name, sliceId);
  // });

  // 构建 VChart 饼图配置
  // const vchartSpec = {
  //   type: 'pie',
  //   data: transformedData,
  //   valueField: 'value',
  //   categoryField: 'name',
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
  //       radius: outerRadius / 100,
  //       innerRadius: donut ? innerRadius / 100 : 0,
  //       padAngle: 0,
  //       label: {
  //         line: {
  //           visible: labelLine,
  //         },
  //         visible: showLabels,
  //         position: 'outside'
  //       }
  //     }
  //   ],
  //   color,
  //   legends: showLegend ? [
  //     {
  //       type: 'discrete',
  //       orient: 'left'
  //     }
  //   ] : []
  // };
  return {
    width,
    height,
    vchartSpec
  };
}
