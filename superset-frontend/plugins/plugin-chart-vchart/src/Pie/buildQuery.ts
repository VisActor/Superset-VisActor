import { buildQueryContext } from '@superset-ui/core';
import { PieChartFormData } from './types';

export default function buildQuery(formData: PieChartFormData) {
  return buildQueryContext(formData, baseQueryObject => {
    return [
      {
        ...baseQueryObject,
        groupby: formData.groupby,
        metrics: [formData.metric],
      },
    ];
  });
}
