import { t, Behavior, ChartPlugin } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import { VchartChartPlugin } from '../types';

export default class VChartAreaChartPlugin extends VchartChartPlugin {
  constructor() {
    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('./VChartArea'),
      metadata: {
        behaviors: [
          Behavior.InteractiveChart,
          Behavior.DrillToDetail,
          Behavior.DrillBy,
        ],
        category: t('Evolution'),
        credits: ['https://visactor.io/vchart'],
        description:
          t(`Area charts show trends over time by filling the area between the line and axis. They're ideal for displaying cumulative values and support both stacked and percentage stacked modes for multiple series comparison.`),
        name: t('Area VChart'),
        tags: [
          t('Time-series'),
          t('Trend'),
          t('Evolution'),
          t('Multi-Series'),
          t('Stacked'),
          t('Continuous'),
          t('VChart'),
        ],
      },
      transformProps,
    });
  }
}