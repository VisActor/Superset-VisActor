import {
  ControlPanelConfig,
  sharedControls,
} from '@superset-ui/chart-controls';
import {
  ensureIsArray,
  isAdhocColumn,
  isPhysicalColumn,
  t,
  validateNonEmpty,
} from '@superset-ui/core';

const config: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'groupbyRows',
            config: {
              ...sharedControls.groupby,
              label: t('Row Dimensions'),
              description: t('Columns to group by on the rows of pivot chart'),
            },
          },
        ],
        [
          {
            name: 'groupbyColumns',
            config: {
              ...sharedControls.groupby,
              label: t('Column Dimensions'),
              description: t('Columns to group by on the columns of pivot chart'),
            },
          },
        ],
        [
          {
            name: 'metrics',
            config: {
              ...sharedControls.metrics,
              validators: [validateNonEmpty],
              label: t('Metrics'),
              description: t('Metrics to display in the pivot chart'),
            },
          },
        ],
        [
          {
            name: 'time_grain_sqla',
            config: {
              ...sharedControls.time_grain_sqla,
              visibility: ({ controls }) => {
                // 安全地访问控件，如果控件不存在则返回空数组
                const groupbyRowsOptions = controls?.groupbyRows?.options || [];
                const groupbyRowsValue = controls?.groupbyRows?.value || [];
                const groupbyColumnsValue = controls?.groupbyColumns?.value || [];
                
                const dttmLookup = Object.fromEntries(
                  ensureIsArray(groupbyRowsOptions).map(
                    option => [option.column_name, option.is_dttm],
                  ),
                );

                return [
                  ...ensureIsArray(groupbyRowsValue),
                  ...ensureIsArray(groupbyColumnsValue),
                ]
                  .map(selection => {
                    if (isAdhocColumn(selection)) {
                      return true;
                    }
                    if (isPhysicalColumn(selection)) {
                      return !!dttmLookup[selection];
                    }
                    return false;
                  })
                  .some(Boolean);
              },
            },
          },
          'temporal_columns_lookup',
        ],
        ['adhoc_filters'],
        [
          {
            name: 'row_limit',
            config: {
              ...sharedControls.row_limit,
              default: 10000,
            },
          },
        ],
      ],
    },
    {
      label: t('Chart Configuration'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'chartType',
            config: {
              type: 'SelectControl',
              label: t('Indicator Chart Type'),
              default: 'column',
              choices: [
                ['column', t('Column')],
                ['bar', t('Bar')],
                ['line', t('Line')],
                ['area', t('Area')],
                ['pie', t('Pie')],
              ],
              description: t('Default chart type for all indicators'),
            },
          },
        ],
        [
          {
            name: 'chartDimensions',
            config: {
              ...sharedControls.groupby,
              label: t('Chart Dimensions'),
              description: t('Dimensions for the sub-charts (used for grouping data within each cell)'),
            },
          },
        ],
      ],
    },
    {
      label: t('Options'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'table_timestamp_format',
            config: {
              type: 'SelectControl',
              freeForm: true,
              label: t('Timestamp Format'),
              default: 'smart_date',
              choices: [
                ['smart_date', t('Adaptive formatting')],
                ['%d/%m/%Y', '%d/%m/%Y | 14/01/2019'],
                ['%m/%d/%Y', '%m/%d/%Y | 01/14/2019'],
                ['%Y-%m-%d', '%Y-%m-%d | 2019-01-14'],
                ['%Y-%m-%d %H:%M:%S', '%Y-%m-%d %H:%M:%S | 2019-01-14 01:32:10'],
                ['%d-%m-%Y %H:%M:%S', '%d-%m-%Y %H:%M:%S | 14-01-2019 01:32:10'],
                ['%H:%M:%S', '%H:%M:%S | 01:32:10'],
              ],
              description: t('Timestamp Format'),
            },
          },
        ],
      ],
    },
  ],
  controlOverrides: {
    metrics: {
      validators: [validateNonEmpty],
      rerender: ['indicator_charts'],
    },
    row_limit: {
      default: 10000,
    },
  },
};

export default config;