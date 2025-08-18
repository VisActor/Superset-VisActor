import { t } from '@superset-ui/core';
import { 
  ControlPanelConfig,
  ControlSubSectionHeader,
  ControlPanelsContainerProps,
} from '@superset-ui/chart-controls';
import { DEFAULT_FORM_DATA } from './types';

const {
  smooth,
  showSymbol,
  symbolSize,
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
        [<ControlSubSectionHeader>{t('Line Style')}</ControlSubSectionHeader>],
        [
          {
            name: 'smooth',
            config: {
              type: 'CheckboxControl',
              label: t('Smooth Line'),
              default: smooth,
              renderTrigger: true,
              description: t('Whether to use smooth curves instead of straight lines'),
            },
          },
        ],
        [
          {
            name: 'showSymbol',
            config: {
              type: 'CheckboxControl',
              label: t('Show Data Points'),
              default: showSymbol,
              renderTrigger: true,
              description: t('Whether to show data point markers on the line'),
            },
          },
        ],
        [
          {
            name: 'symbolSize',
            config: {
              type: 'SliderControl',
              label: t('Data Point Size'),
              renderTrigger: true,
              min: 1,
              max: 10,
              step: 1,
              default: symbolSize,
              description: t('Size of the data point markers'),
              visibility: ({ controls }: ControlPanelsContainerProps) =>
                Boolean(controls?.showSymbol?.value),
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