import { 
  QueryFormData, 
  ChartDataResponseResult,
  QueryFormColumn,
  QueryFormMetric 
} from '@superset-ui/core';

export enum SunburstLabelType {
  Key = 'key',
  Value = 'value',
  KeyValue = 'key_value',
}

export interface SunburstChartFormData extends QueryFormData {
  columns: QueryFormColumn[];
  metric: QueryFormMetric;
  secondaryMetric?: QueryFormMetric;
  colorScheme?: string;
  linearColorScheme?: string;
  showLabels?: boolean;
  showLabelsThreshold?: number;
  showTotal?: boolean;
  labelType?: SunburstLabelType;
  numberFormat?: string;
  dateFormat?: string;
  currencyFormat?: string;
  outerRadius?: number;
  innerRadius?: number;
  gap?: number;
  enableDrill?: boolean;
}

export const DEFAULT_FORM_DATA: Partial<SunburstChartFormData> = {
  columns: [],
  numberFormat: 'SMART_NUMBER',
  labelType: SunburstLabelType.Key,
  showLabels: false,
  showLabelsThreshold: 5,
  showTotal: false,
  dateFormat: 'smart_date',
  outerRadius: 1,
  innerRadius: 0,
  gap: 5,
  enableDrill: true,
};

export interface SunburstChartTransformedProps {
  width: number;
  height: number;
  vchartSpec: any;
}

export interface SunburstChartProps {
  data: ChartDataResponseResult[];
  formData: SunburstChartFormData;
  height: number;
  width: number;
}