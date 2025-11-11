import { ChartProps, DataRecord, getCategoricalSchemeRegistry, ensureIsArray, getMetricLabel, getColumnLabel } from '@superset-ui/core';
import { AreaChartTransformedProps } from './types';
import { Builder, registerAll } from '@visactor/vseed';

// Register all chart types and themes (idempotent, safe to call multiple times)
registerAll();

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

  const metricLabels = ensureIsArray(metrics).map(getMetricLabel);
  const groupbyLabels = groupby.map(getColumnLabel);

  const chartType = stackType === 'percent' ? 'areaPercent' : 'area';
  const vseed: any = {
    chartType: chartType,
    dataset: data,
    dimensions: groupbyLabels.map((label: string) => ({ id: label })),
    measures: metricLabels.map((label: string) => ({ id: label })),
    label: {
      visible: showLabels,
    },
    legend: showLegend ? { visible: true } : { visible: false },
  };

  const builder = new Builder(vseed);
  const vchartSpec = builder.build();

  console.log('vchartSpec', vchartSpec);
  return {
    width,
    height,
    vchartSpec
  };
}