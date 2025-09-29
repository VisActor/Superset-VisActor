import { t, Behavior, ChartPlugin } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import { VchartChartPlugin } from '../types';
import thumbnail from './images/thumbnail.png';
import example1 from './images/Bar1.png';
import example2 from './images/Bar2.png';
import example3 from './images/Bar3.png';

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
        exampleGallery: [{ url: example1 }, { url: example2 }, { url: example3 }],
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
        thumbnail,
      },
      transformProps,
    });
  }
}