import { t, Behavior, ChartPlugin } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';
import example1 from './images/Pie1.jpg';
import example2 from './images/Pie2.jpg';
import example3 from './images/Pie3.jpg';
import example4 from './images/Pie4.jpg';
import { VchartChartPlugin } from '../types';

export default class VChartPieChartPlugin extends VchartChartPlugin {
  constructor() {
    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('./VChartPie'),
      metadata: {
        behaviors: [
          Behavior.InteractiveChart,
          Behavior.DrillToDetail,
          Behavior.DrillBy,
        ],
        category: t('Part of a Whole'),
        credits: ['https://visactor.io/vchart'],
        description:
          t(`The classic. Great for showing how much of a company each investor gets, what demographics follow your blog, or what portion of the budget goes to the military industrial complex.

        Pie charts can be difficult to interpret precisely. If clarity of relative proportion is important, consider using a bar or other chart type instead.`),
        exampleGallery: [
          { url: example1 },
          { url: example2 },
          { url: example3 },
          { url: example4 },
        ],
        name: t('Pie VChart'),
        tags: [
          t('Categorical'),
          t('Circular'),
          t('Comparison'),
          t('Percentages'),
          t('Featured'),
          t('Proportional'),
          t('ECharts'),
          t('Nightingale'),
        ],
        thumbnail,
      },
      transformProps,
    });
  }
}
