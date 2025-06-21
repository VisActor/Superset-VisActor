import { ChartProps } from '@superset-ui/core';

export interface PieChartTransformedProps {
  width: number;
  height: number;
  vchartSpec: any; // VChart 配置对象
}

export type PieChartProps = ChartProps<PieChartFormData>;

export interface PieChartFormData {
  groupby: string[];
  metric: string;
  colorScheme: string;
  showLabels: boolean;
  showLegend: boolean;
  labelType: string;
  // 其他饼图特定配置...
}
