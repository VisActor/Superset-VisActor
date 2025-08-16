import { Behavior, ChartMetadata, ChartPlugin, t } from '@superset-ui/core';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';
import controlPanel from './controlPanel';
import buildQuery from './buildQuery';
import { VTableFormData, VTableProps } from './types';

export { default as __hack__ } from './types';
export * from './types';

const metadata = new ChartMetadata({
  behaviors: [
    Behavior.InteractiveChart,
    Behavior.DrillToDetail,
    Behavior.DrillBy,
  ],
  category: t('Table'),
  canBeAnnotationTypes: ['EVENT', 'INTERVAL'],
  description: t(
    'High-performance table view powered by VTable. Supports large datasets with virtual scrolling.',
  ),
  name: t('VTable'),
  tags: [
    t('Business'),
    t('Featured'),
    t('Report'),
    t('Tabular'),
    t('VTable'),
  ],
  thumbnail,
});

export default class VTableChartPlugin extends ChartPlugin<
  VTableFormData,
  VTableProps
> {
  constructor() {
    super({
      loadChart: () => import('./VTableComponent'),
      metadata,
      transformProps,
      controlPanel,
      buildQuery,
    });
  }
}