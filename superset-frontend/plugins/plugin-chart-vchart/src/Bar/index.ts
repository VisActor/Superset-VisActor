import { t, Behavior, ChartPlugin } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import { VchartChartPlugin } from '../types';

export default class VChartBarChartPlugin extends VchartChartPlugin {
  constructor() {
    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('./VChartBar'),
      metadata: {
        behaviors: [
          Behavior.InteractiveChart,
          Behavior.DrillToDetail,
          Behavior.DrillBy,
        ],
        category: t('Evolution'),
        credits: ['https://visactor.io/vchart'],
        description:
          t(`Bar charts are perfect for comparing values across categories. They support grouped, stacked, and percentage stacked modes for versatile data visualization and easy comparison of multiple metrics.`),
        name: t('Bar VChart'),
        tags: [
          t('Categorical'),
          t('Comparison'),
          t('Ranking'),
          t('Multi-Series'),
          t('Stacked'),
          t('Grouped'),
          t('VChart'),
        ],
      },
      transformProps,
    });
  }
}