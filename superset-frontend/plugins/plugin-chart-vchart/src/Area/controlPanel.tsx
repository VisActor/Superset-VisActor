import { t } from '@superset-ui/core';
import { 
  ControlPanelConfig,
  ControlSubSectionHeader,
  ControlPanelsContainerProps,
} from '@superset-ui/chart-controls';
import { DEFAULT_FORM_DATA } from './types';

const {
  stackType,
  opacity,
} = DEFAULT_FORM_DATA;

const config: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        ['groupby'],
        ['metrics'],
        ['adhoc_filters'],
        ['row_limit'],
      ],
    },
    {
      label: t('Chart Options'),
      expanded: true,
      controlSetRows: [
        ['color_scheme'],
        [<ControlSubSectionHeader>{t('Chart Type')}</ControlSubSectionHeader>],
        [
          {
            name: 'stackType',
            config: {
              type: 'SelectControl',
              label: t('Stack Type'),
              default: stackType,
              choices: [
                ['stacked', t('Stacked')],
                ['percent', t('Percentage Stacked')],
              ],
              renderTrigger: true,
              description: t('Choose how areas should be stacked'),
            },
          },
        ],
        [
          {
            name: 'opacity',
            config: {
              type: 'SliderControl',
              label: t('Area Opacity'),
              renderTrigger: true,
              min: 0,
              max: 1,
              step: 0.1,
              default: opacity,
              description: t('Opacity of the area fill'),
            },
          },
        ],
        [<ControlSubSectionHeader>{t('Labels')}</ControlSubSectionHeader>],
        [
          {
            name: 'show_labels',
            config: {
              type: 'CheckboxControl',
              label: t('Show Labels'),
              default: true,
              renderTrigger: true,
              description: t('Whether to display labels or not'),
            },
          },
        ],
        [<ControlSubSectionHeader>{t('Legend')}</ControlSubSectionHeader>],
        [
          {
            name: 'show_legend',
            config: {
              type: 'CheckboxControl',
              label: t('Show Legend'),
              default: true,
              renderTrigger: true,
              description: t('Whether to display legend or not'),
            },
          },
        ],
      ],
    },
  ],
};

export default config;