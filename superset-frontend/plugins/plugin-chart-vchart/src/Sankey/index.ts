import { t, Behavior } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';
import example1 from './images/example1.png';
import example2 from './images/example2.png';
import { VchartChartPlugin } from '../types';

export default class VChartSankeyChartPlugin extends VchartChartPlugin {
  constructor() {
    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('./VChartSankey'),
      metadata: {
        behaviors: [
          Behavior.InteractiveChart,
          Behavior.DrillToDetail,
          Behavior.DrillBy,
        ],
        category: t('Flow'),
        credits: ['https://visactor.io/vchart'],
        description: t(
          'Sankey charts are ideal for visualizing the flow of data between different stages or categories. ' +
          'They show the magnitude of flow between source and target nodes, making it easy to identify ' +
          'the most significant paths and relationships in your data. Perfect for analyzing user journeys, ' +
          'budget allocations, energy flows, or any process where you want to track how quantities move ' +
          'from one state to another.'
        ),
        exampleGallery: [
          { url: example1 },
          { url: example2 },
        ],
        name: t('Sankey VChart'),
        tags: [
          t('Flow'),
          t('Directional'),
          t('Multi-Stage'),
          t('Proportional'),
          t('Relational'),
          t('Advanced'),
        ],
        thumbnail,
      },
      transformProps,
    });
  }
}