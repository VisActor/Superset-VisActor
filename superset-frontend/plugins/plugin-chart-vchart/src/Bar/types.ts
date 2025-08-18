import { ChartProps } from '@superset-ui/core';

export interface BarChartTransformedProps {
  width: number;
  height: number;
  vchartSpec: any;
}

export type BarChartProps = ChartProps<BarChartFormData>;

export interface BarChartFormData {
  groupby: string[];
  metrics: string[];
  colorScheme: string;
  showLabels: boolean;
  showLegend: boolean;
  stackType: 'stacked' | 'percent' | 'grouped';
}

export const DEFAULT_FORM_DATA = {
  groupby: [],
  metrics: [],
  colorScheme: 'supersetColors',
  showLabels: true,
  showLegend: true,
  stackType: 'grouped',
};