import { t, validateNonEmpty } from '@superset-ui/core';
import {
  ControlPanelConfig,
  dndGroupByControl,
} from '@superset-ui/chart-controls';

const config: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'source',
            config: {
              ...dndGroupByControl,
              label: t('Source'),
              multi: false,
              description: t(
                'The column to be used as the source of the flow.',
              ),
              validators: [validateNonEmpty],
              freeForm: false,
            },
          },
        ],
        [
          {
            name: 'target',
            config: {
              ...dndGroupByControl,
              label: t('Target'),
              multi: false,
              description: t(
                'The column to be used as the target of the flow.',
              ),
              validators: [validateNonEmpty],
              freeForm: false,
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
            name: 'node_width',
            config: {
              type: 'SliderControl',
              label: t('Node Width'),
              default: 20,
              min: 5,
              max: 50,
              step: 1,
              renderTrigger: true,
              description: t('Width of the sankey nodes'),
            },
          },
        ],
        [
          {
            name: 'node_gap',
            config: {
              type: 'SliderControl',
              label: t('Node Gap'),
              default: 8,
              min: 2,
              max: 50,
              step: 1,
              renderTrigger: true,
              description: t('Gap between nodes'),
            },
          },
        ],
      ],
    },
  ],
};

export default config;