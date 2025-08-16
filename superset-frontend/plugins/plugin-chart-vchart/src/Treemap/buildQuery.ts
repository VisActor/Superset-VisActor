import {
  buildQueryContext,
  ensureIsArray,
  QueryFormColumn,
} from '@superset-ui/core';
import { TreemapChartFormData } from './types';

export default function buildQuery(formData: TreemapChartFormData) {
  const { groupby } = formData;
  
  // 将 groupby 字段作为 columns 添加到查询中
  const columns = ensureIsArray<QueryFormColumn>(groupby);

  return buildQueryContext(formData, baseQueryObject => [
    {
      ...baseQueryObject,
      columns,
    },
  ]);
}