import { ChartProps, QueryFormColumn, QueryFormData, QueryFormMetric } from '@superset-ui/core';

export interface SankeyChartFormData extends QueryFormData {
  source: QueryFormColumn;
  target: QueryFormColumn;
  metric: QueryFormMetric;
  colorScheme: string;
  nodeWidth?: number;
  nodeGap?: number;
}

export interface SankeyChartTransformedProps {
  width: number;
  height: number;
  vchartSpec: any; // VChart 配置对象
}

export type SankeyChartProps = ChartProps<SankeyChartFormData>;

export const DEFAULT_FORM_DATA = {
  colorScheme: 'supersetColors',
};