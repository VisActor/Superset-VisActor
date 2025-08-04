import { ChartProps } from '@superset-ui/core';

export interface ColumnChartTransformedProps {
  width: number;
  height: number;
  vchartSpec: any;
}

export type ColumnChartProps = ChartProps<ColumnChartFormData>;

export interface ColumnChartFormData {
  groupby: string[];
  metrics: string[];
  colorScheme: string;
  showLabels: boolean;
  showLegend: boolean;
  stackType: 'stacked' | 'percent' | 'grouped';
  orientation: 'vertical' | 'horizontal';
}

export const DEFAULT_FORM_DATA = {
  groupby: [],
  metrics: [],
  colorScheme: 'supersetColors',
  showLabels: true,
  showLegend: true,
  stackType: 'grouped',
  orientation: 'vertical',
};