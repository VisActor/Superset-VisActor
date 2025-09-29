import { t } from '@superset-ui/core';
import { 
  ControlPanelConfig,
  ControlSubSectionHeader,
  ControlPanelsContainerProps,
} from '@superset-ui/chart-controls';
import { DEFAULT_FORM_DATA } from './types';

const {
  stackType,
  orientation,
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
              label: t('Chart Type'),
              default: stackType,
              choices: [
                ['grouped', t('Grouped')],
                ['stacked', t('Stacked')],
                ['percent', t('Percentage Stacked')],
              ],
              renderTrigger: true,
              description: t('Choose how columns should be displayed'),
            },
          },
        ],
        // [
        //   {
        //     name: 'orientation',
        //     config: {
        //       type: 'RadioButtonControl',
        //       label: t('Orientation'),
        //       default: orientation,
        //       options: [
        //         ['vertical', t('Vertical')],
        //         ['horizontal', t('Horizontal')],
        //       ],
        //       renderTrigger: true,
        //       description: t('Choose the orientation of the chart'),
        //     },
        //   },
        // ],
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