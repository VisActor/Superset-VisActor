import {
  buildQueryContext,
  ensureIsArray,
  QueryFormColumn,
} from '@superset-ui/core';
import { SankeyChartFormData } from './types';

export default function buildQuery(formData: SankeyChartFormData) {
  const { source, target } = formData;
  
  // 将 source 和 target 作为 columns 添加到查询中
  const columns = Array.from(
    new Set([
      ...ensureIsArray<QueryFormColumn>(source),
      ...ensureIsArray<QueryFormColumn>(target),
    ]),
  );

  return buildQueryContext(formData, baseQueryObject => [
    {
      ...baseQueryObject,
      columns,
    },
  ]);
}