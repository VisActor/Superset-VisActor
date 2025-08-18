import { ChartProps, DataRecord, getCategoricalSchemeRegistry, ensureIsArray, getMetricLabel, getColumnLabel } from '@superset-ui/core';
import { LineChartTransformedProps } from './types';
import { VizSeedBuilder } from 'yizseed';

export default function transformProps(chartProps: ChartProps): LineChartTransformedProps {
  const {
    formData,
    height,
    queriesData,
    width,
  } = chartProps;

  const { 
    groupby, 
    metrics, 
    colorScheme, 
    showLabels = true, 
    showLegend = true,
    smooth = false,
    showSymbol = true,
    symbolSize = 4
  } = formData;

  const data = queriesData[0].data as DataRecord[];
  const colors = getCategoricalSchemeRegistry().get(colorScheme)?.colors;
  const builder = new VizSeedBuilder(data);

  const metricLabels = ensureIsArray(metrics).map(getMetricLabel);
  const groupbyLabels = groupby.map(getColumnLabel);

  
  const vizSeedDSL = builder
    .setChartType('line')
    .setDimensions(groupbyLabels)
    .setMeasures(metricLabels)
    .setStyle({
      label: {
        visible: showLabels,
      }
    })
    .setLegend(showLegend)
    .build();

  let vchartSpec = VizSeedBuilder.from(vizSeedDSL).buildSpec();
  vchartSpec = {
    ...vchartSpec,
    color: colors
  };
  return {
    width,
    height,
    vchartSpec
  };
}