import { t, Behavior, ChartPlugin } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import { VchartChartPlugin } from '../types';
import thumbnail from './images/thumbnail.png';
import example1 from './images/Bar1.png';
import example2 from './images/Bar2.png';
import example3 from './images/Bar3.png';

export default class VChartColumnChartPlugin extends VchartChartPlugin {
  constructor() {
    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('./VChartColumn'),
      metadata: {
        behaviors: [
          Behavior.InteractiveChart,
          Behavior.DrillToDetail,
          Behavior.DrillBy,
        ],
        category: t('Evolution'),
        credits: ['https://visactor.io/vchart'],
        description:
          t(`Column charts are ideal for comparing categorical data or showing changes over time. They support multiple display modes including grouped, stacked, and percentage stacked views for comprehensive data analysis.`),
        exampleGallery: [{ url: example1 }, { url: example2 }, { url: example3 }],
        name: t('Column VChart'),
        tags: [
          t('Categorical'),
          t('Comparison'),
          t('Evolution'),
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