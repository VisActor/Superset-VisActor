import {
  ChartProps,
  DataRecord,
  getMetricLabel,
  getColumnLabel,
  getNumberFormatter,
} from '@superset-ui/core';
import { SunburstChartTransformedProps, SunburstChartFormData, SunburstLabelType } from './types';

interface SunburstNode {
  name: string;
  value?: number;
  children?: SunburstNode[];
  secondaryValue?: number;
}

export default function transformProps(chartProps: ChartProps<SunburstChartFormData>): SunburstChartTransformedProps {
  const {
    formData,
    height,
    queriesData,
    width,
  } = chartProps;

  const {
    columns = [],
    metric,
    secondaryMetric,
    showLabels = false,
    showLabelsThreshold = 5,
    labelType = SunburstLabelType.Key,
    numberFormat = 'SMART_NUMBER',
    outerRadius = 1,
    innerRadius = 0,
    gap = 5,
    enableDrill = true,
  } = formData;

  const data = queriesData[0].data as DataRecord[];

  const metricLabel = getMetricLabel(metric);
  const secondaryMetricLabel = secondaryMetric ? getMetricLabel(secondaryMetric) : null;
  const columnLabels = columns.map(getColumnLabel);

  const numberFormatter = getNumberFormatter(numberFormat);

  const buildHierarchy = (records: DataRecord[], dimensions: string[]): SunburstNode[] => {
    if (dimensions.length === 0) {
      return [];
    }

    const [currentDimension, ...remainingDimensions] = dimensions;
    const groups = new Map<string, DataRecord[]>();

    records.forEach(record => {
      const key = String(record[currentDimension] || 'Unknown');
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(record);
    });

    return Array.from(groups.entries()).map(([groupName, groupRecords]) => {
      if (remainingDimensions.length > 0) {
        return {
          name: groupName,
          children: buildHierarchy(groupRecords, remainingDimensions),
        };
      } else {
        const value = groupRecords.reduce((sum, record) => {
          return sum + (Number(record[metricLabel]) || 0);
        }, 0);
        
        const secondaryValue = secondaryMetricLabel 
          ? groupRecords.reduce((sum, record) => {
              return sum + (Number(record[secondaryMetricLabel]) || 0);
            }, 0)
          : 0;

        return {
          name: groupName,
          value,
          secondaryValue,
        };
      }
    });
  };

  const hierarchyData = buildHierarchy(data, columnLabels);

  const formatLabel = (datum: any) => {
    const { name, value } = datum;
    
    switch (labelType) {
      case SunburstLabelType.Value:
        return numberFormatter(value);
      case SunburstLabelType.KeyValue:
        return `${name}: ${numberFormatter(value)}`;
      default:
        return name;
    }
  };

  const vchartSpec = {
    type: 'sunburst',
    offsetX: 0,
    offsetY: 0,
    categoryField: 'name',
    valueField: 'value',
    outerRadius,
    innerRadius,
    gap,
    drill: enableDrill,
    sunburst: {
      visible: true,
      style: {
        fillOpacity: (datum: any) => {
          return datum.isLeaf ? 0.6 : 0.8;
        }
      }
    },
    label: {
      visible: showLabels,
      style: {
        fontSize: 12,
        fillOpacity: (datum: any) => {
          return datum.isLeaf ? 0.7 : 0.9;
        },
        text: (datum: any) => {
          const totalValue = datum.value || 0;
          const parentValue = datum.parent?.value || totalValue;
          const percentage = parentValue > 0 ? (totalValue / parentValue) * 100 : 0;
          
          if (percentage < showLabelsThreshold!) {
            return '';
          }
          
          return formatLabel(datum);
        }
      }
    },
    tooltip: {
      mark: {
        title: {
          value: (val: any) => {
            return val?.datum?.map((data: any) => data.name).join(' / ');
          }
        }
      }
    },
    data: [
      {
        id: 'data',
        values: hierarchyData
      }
    ],
    animationEnter: {
      easing: 'cubicInOut',
      duration: 1000
    },
    animationExit: {
      easing: 'cubicInOut',
      duration: 1000
    },
    animationUpdate: {
      easing: 'cubicInOut',
      duration: 1000
    }
  };

  return {
    width,
    height,
    vchartSpec,
  };
}