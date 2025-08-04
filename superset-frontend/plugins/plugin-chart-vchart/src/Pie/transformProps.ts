import { ChartProps, DataRecord, getCategoricalSchemeRegistry } from '@superset-ui/core';
import { PieChartTransformedProps } from './types';
import { VizSeedBuilder } from 'yizseed';
import { color } from 'd3-color';

export default function transformProps(chartProps: ChartProps): PieChartTransformedProps {
  const {
    formData,
    height,
    queriesData,
    width,
  } = chartProps;
  const { groupby, metric, colorScheme, showLabels = true, showLegend = true, outerRadius, innerRadius, donut, labelLine } = formData;
  const data = queriesData[0].data as DataRecord[];

  const colors = getCategoricalSchemeRegistry().get(colorScheme)?.colors
  const builder = new VizSeedBuilder(data);

  const vizSeedDSL = builder
    .setChartType('pie')
    .setDimensions(groupby)
    .setMeasures([metric])
    .setStyle({
      label: {
        line: {
          visible: labelLine,
        },
        visible: showLabels,
        position: 'outside',
      },
      color: colors,
      pie: {
        outerRadius: outerRadius / 100,
        innerRadius: donut ? innerRadius / 100 : 0,
        // animationAppear: false
      }
    })
    .setLegend(showLegend)
    .build(); 
  const vchartSpec = VizSeedBuilder.from(vizSeedDSL).buildSpec();



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
