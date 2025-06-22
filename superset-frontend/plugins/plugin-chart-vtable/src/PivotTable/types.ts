import { ChartProps } from '@superset-ui/core';

export interface PivotTableTransformedProps {
  width: number;
  height: number;
  vtableOption: any; // VTable 配置对象
}

export type PivotTableProps = ChartProps<PivotTableFormData>;

export interface PivotTableFormData {
  groupbyRows: string[];
  groupbyColumns: string[];
  metrics: string[];
  colOrder: string;
  rowOrder: string;
  aggregateFunction: string;
  // 其他透视表特定配置...
}
