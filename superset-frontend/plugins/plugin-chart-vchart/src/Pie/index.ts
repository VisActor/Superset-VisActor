import { t, ChartMetadata, ChartPlugin } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from '../images/thumbnail.png';

export default class VChartPieChartPlugin extends ChartPlugin {
  constructor() {
    const metadata = new ChartMetadata({
      name: t('VChart Pie'),
      description: t('VChart Pie Chart'),
      thumbnail,
    });

    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('./VChartPie'),
      metadata,
      transformProps,
    });
  }
}
