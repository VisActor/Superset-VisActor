import { t, Behavior, ChartPlugin } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import { VchartChartPlugin } from '../types';

export default class VChartLineChartPlugin extends VchartChartPlugin {
  constructor() {
    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('./VChartLine'),
      metadata: {
        behaviors: [
          Behavior.InteractiveChart,
          Behavior.DrillToDetail,
          Behavior.DrillBy,
        ],
        category: t('Evolution'),
        credits: ['https://visactor.io/vchart'],
        description:
          t(`Line charts are perfect for showing trends and changes over time. They connect data points with lines and support smooth curves, customizable markers, and multiple series for comprehensive trend analysis.`),
        name: t('Line VChart'),
        tags: [
          t('Time-series'),
          t('Trend'),
          t('Evolution'),
          t('Multi-Series'),
          t('Continuous'),
          t('Connected'),
          t('VChart'),
        ],
      },
      transformProps,
    });
  }
}