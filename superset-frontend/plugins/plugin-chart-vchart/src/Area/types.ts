import { ChartProps } from '@superset-ui/core';

export interface AreaChartTransformedProps {
  width: number;
  height: number;
  vchartSpec: any;
}

export type AreaChartProps = ChartProps<AreaChartFormData>;

export interface AreaChartFormData {
  groupby: string[];
  metrics: string[];
  colorScheme: string;
  showLabels: boolean;
  showLegend: boolean;
  stackType: 'stacked' | 'percent';
  opacity: number;
}

export const DEFAULT_FORM_DATA = {
  groupby: [],
  metrics: [],
  colorScheme: 'supersetColors',
  showLabels: false,
  showLegend: true,
  stackType: 'stacked',
  opacity: 0.7,
};