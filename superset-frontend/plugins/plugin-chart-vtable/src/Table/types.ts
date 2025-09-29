import { ChartProps, QueryFormData, QueryFormMetric, QueryFormColumn, QueryMode, GenericDataType } from '@superset-ui/core';
import { ListTableConstructorOptions } from '@visactor/vtable';

export interface VTableTransformedProps {
  width: number;
  height: number;
  vtableOption: ListTableConstructorOptions;
}

export type VTableProps = ChartProps<VTableFormData>;

export interface VTableFormData extends QueryFormData {
  query_mode?: QueryMode;
  all_columns?: QueryFormColumn[];
  metrics?: QueryFormMetric[];
  page_length?: string | number | null;
  include_search?: boolean;
  order_desc?: boolean;
  show_cell_bars?: boolean;
  table_timestamp_format?: string;
  allow_rearrange_columns?: boolean;
}

export interface VTableColumnMeta {
  key: string;
  label: string;
  dataType: GenericDataType;
  isMetric?: boolean;
  isNumeric?: boolean;
}

export enum ColorSchemeEnum {
  'Green' = 'Green',
  'Red' = 'Red',
}