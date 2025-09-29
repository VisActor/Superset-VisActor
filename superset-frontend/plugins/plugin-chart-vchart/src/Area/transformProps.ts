import { ChartProps, DataRecord, getCategoricalSchemeRegistry, ensureIsArray, getMetricLabel, getColumnLabel } from '@superset-ui/core';
import { AreaChartTransformedProps } from './types';
import { VizSeedBuilder} from 'yizseed';

export default function transformProps(chartProps: ChartProps): AreaChartTransformedProps {
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
    showLabels,
    showLegend,
    stackType,
    opacity = 0.7
  } = formData;

  const data = queriesData[0].data as DataRecord[];
  const colors = getCategoricalSchemeRegistry().get(colorScheme)?.colors;
  const builder = new VizSeedBuilder(data);

  const metricLabels = ensureIsArray(metrics).map(getMetricLabel);
  const groupbyLabels = groupby.map(getColumnLabel);

  const chartType = stackType === null ? 'area_stacked' : 'area_' + stackType;
  const vizSeedDSL = builder
    .setChartType(chartType)
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
  console.log('vchartSpec', vchartSpec);
  return {
    width,
    height,
    vchartSpec
  };
}