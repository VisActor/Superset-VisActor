import {
  ChartProps,
  DataRecord,
  getCategoricalSchemeRegistry,
  getMetricLabel,
  getColumnLabel
} from '@superset-ui/core';
import { TreemapChartTransformedProps, TreemapChartFormData } from './types';

interface TreeNode {
  name: string;
  value?: number;
  children?: TreeNode[];
}

export default function transformProps(chartProps: ChartProps<TreemapChartFormData>): TreemapChartTransformedProps {
  const {
    formData,
    height,
    queriesData,
    width,
  } = chartProps;

  const {
    groupby = [],
    metric,
    colorScheme = 'supersetColors',
    showLabels = true,
    labelLevel = 2,
  } = formData;

  const data = queriesData[0].data as DataRecord[];

  // 获取字段标签
  const metricLabel = getMetricLabel(metric);
  const groupbyLabels = groupby.map(getColumnLabel);

  // 获取颜色方案
  const colors = getCategoricalSchemeRegistry().get(colorScheme)?.colors || [
    '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
    '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
  ];

  // 构建层次结构数据
  const buildHierarchy = (records: DataRecord[], dimensions: string[]): TreeNode[] => {
    if (dimensions.length === 0) {
      return [];
    }

    const [currentDimension, ...remainingDimensions] = dimensions;
    const groups = new Map<string, DataRecord[]>();

    // 按当前维度分组
    records.forEach(record => {
      const key = String(record[currentDimension] || 'Unknown');
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(record);
    });

    // 构建节点
    return Array.from(groups.entries()).map(([groupName, groupRecords], index) => {
      if (remainingDimensions.length > 0) {
        // 还有子维度，递归构建
        return {
          name: groupName,
          children: buildHierarchy(groupRecords, remainingDimensions),
        };
      } else {
        // 叶子节点，计算值
        const value = groupRecords.reduce((sum, record) => {
          return sum + (Number(record[metricLabel]) || 0);
        }, 0);
        return {
          name: groupName,
          value,
        };
      }
    });
  };

  // 构建树形数据
  const hierarchyData = buildHierarchy(data, groupbyLabels);
  console.log('data', data);
  console.log('hierarchyData', hierarchyData);
  // 如果只有一层数据，包装到根节点中

  // 构建 VChart Treemap 配置（基于官方样例）
  const vchartSpec = {
    type: 'treemap',
    data: [
      {
        id: 'data',
        values: hierarchyData,
      }
    ],
    categoryField: 'name',
    valueField: 'value',
    label: {
      visible: true,
      style: {
        fontSize: 12,
        x: data => {
          return data?.x0 + 4;
        },
        y: data => {
          return data?.y0;
        },
        visible: data => Math.abs(data.y1 - data.y0) >= 12,
        maxLength: data => Math.abs(data.x1 - data.x0 - 4),
        textAlign: 'left',
        textBaseline: 'top'
      }
    },
    nonLeaf: {
      visible: true
    },
    nonLeafLabel: {
      visible: true,
      position: 'top',
      padding: 30,
      style: {
        x: data => {
          return data.labelRect?.x0 + 4;
        },
        textAlign: 'left',
        text: data => [data.name, data.value]
      }
    },
    tooltip: {
      mark: {
        title: {
          value: data => {
            return data?.datum?.map(data => data.name).join('/');
          }
        }
      }
    }
  };
  return {
    width,
    height,
    vchartSpec,
  };
}