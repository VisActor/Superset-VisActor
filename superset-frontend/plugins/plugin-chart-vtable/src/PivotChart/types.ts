import { ChartProps, QueryFormData } from '@superset-ui/core';
import { PivotChartConstructorOptions } from '@visactor/vtable';

export interface PivotChartTransformedProps {
  width: number;
  height: number;
  vtableOption: PivotChartConstructorOptions;
}

export interface IndicatorChartConfig {
  chartType: 'column' | 'bar' | 'line' | 'area' | 'pie';
  dimensions: string[];
  measures: string[];
}

export interface PivotChartQueryFormData extends QueryFormData {
  groupbyRows: string[];
  groupbyColumns: string[];
  metrics: string[];
  chartType: 'column' | 'bar' | 'line' | 'area' | 'pie';
  chartDimensions: string[];
  tableTimestampFormat: string;
}

export type PivotChartProps = ChartProps<PivotChartQueryFormData>;

export interface VTableTransformedProps {
  width: number;
  height: number;
  vtableOption: any;
}