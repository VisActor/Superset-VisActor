import { t } from '@superset-ui/core';
import {
  ControlPanelConfig,
  ControlPanelsContainerProps,
  ControlSubSectionHeader,
  D3_FORMAT_DOCS,
  D3_NUMBER_FORMAT_DESCRIPTION_VALUES_TEXT,
  D3_FORMAT_OPTIONS,
  D3_TIME_FORMAT_OPTIONS,
  getStandardizedControls,
} from '@superset-ui/chart-controls';
import { DEFAULT_FORM_DATA, SunburstLabelType } from './types';

const { labelType, numberFormat, showLabels, showLabelsThreshold, showTotal, outerRadius, innerRadius, gap, enableDrill } = DEFAULT_FORM_DATA;

const config: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        ['columns'],
        ['metric'],
        ['secondary_metric'],
        ['adhoc_filters'],
        ['row_limit'],
        ['sort_by_metric'],
      ],
    },
    {
      label: t('Chart Options'),
      expanded: true,
      controlSetRows: [
        ['color_scheme'],
        ['linear_color_scheme'],
        [<ControlSubSectionHeader>{t('Labels')}</ControlSubSectionHeader>],
        [
          {
            name: 'show_labels',
            config: {
              type: 'CheckboxControl',
              label: t('Show Labels'),
              renderTrigger: true,
              default: showLabels,
              description: t('Whether to display the labels.'),
            },
          },
        ],
        [
          {
            name: 'show_labels_threshold',
            config: {
              type: 'TextControl',
              label: t('Percentage threshold'),
              renderTrigger: true,
              isFloat: true,
              default: showLabelsThreshold,
              description: t(
                'Minimum threshold in percentage points for showing labels.',
              ),
            },
          },
        ],
        [
          {
            name: 'show_total',
            config: {
              type: 'CheckboxControl',
              label: t('Show Total'),
              default: showTotal,
              renderTrigger: true,
              description: t('Whether to display the aggregate count'),
            },
          },
        ],
        [
          {
            name: 'label_type',
            config: {
              type: 'SelectControl',
              label: t('Label Type'),
              default: labelType,
              renderTrigger: true,
              choices: [
                [SunburstLabelType.Key, t('Category Name')],
                [SunburstLabelType.Value, t('Value')],
                [SunburstLabelType.KeyValue, t('Category and Value')],
              ],
              description: t('What should be shown on the label?'),
            },
          },
        ],
        [
          {
            name: 'number_format',
            config: {
              type: 'SelectControl',
              freeForm: true,
              label: t('Number format'),
              renderTrigger: true,
              default: numberFormat,
              choices: D3_FORMAT_OPTIONS,
              description: `${D3_FORMAT_DOCS} ${D3_NUMBER_FORMAT_DESCRIPTION_VALUES_TEXT}`,
            },
          },
        ],
        ['currency_format'],
        [
          {
            name: 'date_format',
            config: {
              type: 'SelectControl',
              freeForm: true,
              label: t('Date format'),
              renderTrigger: true,
              choices: D3_TIME_FORMAT_OPTIONS,
              default: 'smart_date',
              description: D3_FORMAT_DOCS,
            },
          },
        ],
        [<ControlSubSectionHeader>{t('Chart Options')}</ControlSubSectionHeader>],
        [
          {
            name: 'outer_radius',
            config: {
              type: 'SliderControl',
              label: t('Outer Radius'),
              default: outerRadius,
              min: 0.1,
              max: 1,
              step: 0.1,
              renderTrigger: true,
              description: t('Radius of the outermost ring (0.1 to 1.0)'),
            },
          },
        ],
        [
          {
            name: 'inner_radius',
            config: {
              type: 'SliderControl',
              label: t('Inner Radius'),
              default: innerRadius,
              min: 0,
              max: 0.8,
              step: 0.1,
              renderTrigger: true,
              description: t('Radius of the inner circle (0 = full sunburst, >0 = donut shape)'),
            },
          },
        ],
        [
          {
            name: 'gap',
            config: {
              type: 'SliderControl',
              label: t('Gap'),
              default: gap,
              min: 0,
              max: 20,
              step: 1,
              renderTrigger: true,
              description: t('Gap between segments in pixels'),
            },
          },
        ],
        [
          {
            name: 'enable_drill',
            config: {
              type: 'CheckboxControl',
              label: t('Enable Drill Down'),
              default: enableDrill,
              renderTrigger: true,
              description: t('Allow clicking segments to drill down into sub-levels'),
            },
          },
        ],
      ],
    },
  ],
  controlOverrides: {
    metric: {
      label: t('Primary Metric'),
      description: t(
        'The primary metric is used to define the arc segment sizes',
      ),
    },
    secondary_metric: {
      label: t('Secondary Metric'),
      default: null,
      description: t(
        '[optional] this secondary metric is used to ' +
          'define the color as a ratio against the primary metric. ' +
          'When omitted, the color is categorical and based on labels',
      ),
    },
    color_scheme: {
      description: t(
        'When only a primary metric is provided, a categorical color scale is used.',
      ),
      visibility: ({ controls }: ControlPanelsContainerProps) =>
        Boolean(
          !controls?.secondary_metric?.value ||
            controls?.secondary_metric?.value === controls?.metric.value,
        ),
    },
    linear_color_scheme: {
      description: t(
        'When a secondary metric is provided, a linear color scale is used.',
      ),
      visibility: ({ controls }: ControlPanelsContainerProps) =>
        Boolean(
          controls?.secondary_metric?.value &&
            controls?.secondary_metric?.value !== controls?.metric.value,
        ),
    },
    columns: {
      label: t('Hierarchy'),
      description: t(`Sets the hierarchy levels of the chart. Each level is
        represented by one ring with the innermost circle as the top of the hierarchy.`),
    },
  },
  formDataOverrides: formData => ({
    ...formData,
    groupby: getStandardizedControls().popAllColumns(),
    metric: getStandardizedControls().shiftMetric(),
    secondary_metric: getStandardizedControls().shiftMetric(),
  }),
};

export default config;