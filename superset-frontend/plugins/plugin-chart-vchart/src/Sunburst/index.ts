import { t, Behavior } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';
import example1 from './images/Sunburst1.png';
import example2 from './images/Sunburst2.png';
import { VchartChartPlugin } from '../types';

export default class VChartSunburstChartPlugin extends VchartChartPlugin {
  constructor() {
    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('./VChartSunburst'),
      metadata: {
        behaviors: [
          Behavior.InteractiveChart,
          Behavior.DrillToDetail,
          Behavior.DrillBy,
        ],
        category: t('Part of a Whole'),
        credits: ['https://visactor.io/vchart'],
        description: t(
          'Sunburst charts are perfect for visualizing hierarchical data in a radial layout. ' +
          'They display data as concentric rings, where each ring represents a level in the hierarchy ' +
          'and the size of each segment represents a quantitative value. Ideal for showing organizational ' +
          'structures, file system hierarchies, budget breakdowns, or any multi-level categorical data. ' +
          'The radial design makes it easy to understand both the hierarchy and proportional relationships.'
        ),
        exampleGallery: [
          { url: example1 },
          { url: example2 },
        ],
        name: t('Sunburst VChart'),
        tags: [
          t('Hierarchical'),
          t('Part of a Whole'),
          t('Categorical'),
          t('Radial'),
          t('Multi-level'),
          t('Interactive'),
        ],
        thumbnail,
      },
      transformProps,
    });
  }
}