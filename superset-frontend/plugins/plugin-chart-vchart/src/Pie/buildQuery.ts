import { buildQueryContext, QueryFormData } from '@superset-ui/core';
export default function buildQuery(formData: QueryFormData) {
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
