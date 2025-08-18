import { ChartProps, QueryFormColumn, QueryFormData, QueryFormMetric } from '@superset-ui/core';

export interface TreemapChartFormData extends QueryFormData {
  groupby: QueryFormColumn[];
  metric: QueryFormMetric;
  colorScheme: string;
  showLabels?: boolean;
  labelLevel?: number;
}

export interface TreemapChartTransformedProps {
  width: number;
  height: number;
  vchartSpec: any; // VChart 配置对象
}

export type TreemapChartProps = ChartProps<TreemapChartFormData>;

export const DEFAULT_FORM_DATA = {
  colorScheme: 'supersetColors',
  showLabels: true,
  labelLevel: 2,
};