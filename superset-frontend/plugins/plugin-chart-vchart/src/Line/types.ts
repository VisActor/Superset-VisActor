import { ChartProps } from '@superset-ui/core';

export interface LineChartTransformedProps {
  width: number;
  height: number;
  vchartSpec: any;
}

export type LineChartProps = ChartProps<LineChartFormData>;

export interface LineChartFormData {
  groupby: string[];
  metrics: string[];
  colorScheme: string;
  showLabels: boolean;
  showLegend: boolean;
  smooth: boolean;
  showSymbol: boolean;
  symbolSize: number;
}

export const DEFAULT_FORM_DATA = {
  groupby: [],
  metrics: [],
  colorScheme: 'supersetColors',
  showLabels: false,
  showLegend: true,
  smooth: false,
  showSymbol: true,
  symbolSize: 4,
};