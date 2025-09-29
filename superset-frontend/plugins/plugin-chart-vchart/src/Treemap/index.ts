import { t, Behavior } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';
import example1 from './images/example1.png';
import example2 from './images/example2.png';
import { VchartChartPlugin } from '../types';

export default class VChartTreemapChartPlugin extends VchartChartPlugin {
  constructor() {
    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('./VChartTreemap'),
      metadata: {
        behaviors: [
          Behavior.InteractiveChart,
          Behavior.DrillToDetail,
          Behavior.DrillBy,
        ],
        category: t('Part of a Whole'),
        credits: ['https://visactor.io/vchart'],
        description: t(
          'Treemap charts are excellent for visualizing hierarchical data and part-to-whole relationships. ' +
          'They display data as nested rectangles, where the size of each rectangle represents a quantitative value. ' +
          'Perfect for showing file system usage, budget breakdowns, organizational structures, or any data with ' +
          'natural hierarchical groupings. The nested structure makes it easy to understand both individual ' +
          'components and their relationship to the whole.'
        ),
        exampleGallery: [
          { url: example1 },
          { url: example2 },
        ],
        name: t('Treemap VChart'),
        tags: [
          t('Hierarchical'),
          t('Part of a Whole'),
          t('Categorical'),
          t('Nested'),
          t('Proportional'),
          t('Multi-level'),
        ],
        thumbnail,
      },
      transformProps,
    });
  }
}