import { t, ChartMetadata, ChartPlugin, Behavior, ChartProps } from '@superset-ui/core';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import thumbnail from './images/thumbnail.png';
import { PivotChartQueryFormData } from './types';

export default class VTablePivotChartPlugin extends ChartPlugin<PivotChartQueryFormData> {
  constructor() {
    const metadata = new ChartMetadata({
        behaviors: [
          Behavior.InteractiveChart,
          Behavior.DrillToDetail,
          Behavior.DrillBy,
        ],
        category: t('Table'),
        description: t(
          'Pivot chart visualization that combines pivot table functionality with embedded charts. Each cell can display different chart types (column, bar, line, area, pie) to visualize metrics across multiple dimensions.',
        ),
        name: t('Pivot Chart VTable'),
        tags: [t('Advanced'), t('Interactive'), t('Charts'), t('Pivot')],
        thumbnail,
      });

    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('./VTablePivotChart'),
      metadata,
      transformProps,
    });
  }
}