import {
  buildQueryContext,
  ensureIsArray,
  QueryFormColumn,
} from '@superset-ui/core';
import { SunburstChartFormData } from './types';

export default function buildQuery(formData: SunburstChartFormData) {
  const { columns } = formData;
  
  const groupby = ensureIsArray<QueryFormColumn>(columns);

  return buildQueryContext(formData, baseQueryObject => [
    {
      ...baseQueryObject,
      columns: groupby,
    },
  ]);
}