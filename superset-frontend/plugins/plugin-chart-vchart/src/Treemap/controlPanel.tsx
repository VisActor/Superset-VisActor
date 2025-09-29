import { t, validateNonEmpty } from '@superset-ui/core';
import {
  ControlPanelConfig,
  sharedControls,
} from '@superset-ui/chart-controls';

const config: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'groupby',
            config: {
              ...sharedControls.groupby,
              label: t('Dimensions'),
              description: t(
                'Hierarchical dimensions for the treemap. The first dimension defines the top level, subsequent dimensions create nested levels.',
              ),
              validators: [validateNonEmpty],
            },
          },
        ],
        ['metric'],
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
        [
          {
            name: 'show_labels',
            config: {
              type: 'CheckboxControl',
              label: t('Show Labels'),
              default: true,
              renderTrigger: true,
              description: t('Whether to display labels on treemap rectangles'),
            },
          },
        ],
        [
          {
            name: 'label_level',
            config: {
              type: 'SliderControl',
              label: t('Label Level'),
              default: 2,
              min: 1,
              max: 5,
              step: 1,
              renderTrigger: true,
              description: t('Maximum level depth to show labels (1 = top level only)'),
            },
          },
        ],
      ],
    },
  ],
};

export default config;