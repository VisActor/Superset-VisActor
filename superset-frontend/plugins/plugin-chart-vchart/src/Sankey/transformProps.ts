import { 
  ChartProps, 
  DataRecord, 
  getMetricLabel,
  getColumnLabel 
} from '@superset-ui/core';
import { SankeyChartTransformedProps, SankeyChartFormData } from './types';

export default function transformProps(chartProps: ChartProps<SankeyChartFormData>): SankeyChartTransformedProps {
  const {
    formData,
    height,
    queriesData,
    width,
  } = chartProps;
  
  const { 
    source, 
    target, 
    metric, 
    nodeWidth = 20,
    nodeGap = 8,
  } = formData;
  
  const data = queriesData[0].data as DataRecord[];
  
  // 获取字段标签
  const sourceLabel = getColumnLabel(source);
  const targetLabel = getColumnLabel(target);
  const metricLabel = getMetricLabel(metric);
  
  // 验证数据
  
  // 转换数据为 Sankey 格式
  const nodeNames = new Set<string>();
  const tempLinks: Array<{
    source: string;
    target: string;
    value: number;
  }> = [];
  
  // 收集所有节点和链接
  data.forEach(record => {
    const sourceValue = String(record[sourceLabel]);
    const targetValue = String(record[targetLabel]);
    const value = Number(record[metricLabel]) || 0;
    
    nodeNames.add(sourceValue);
    nodeNames.add(targetValue);
    
    tempLinks.push({
      source: sourceValue,
      target: targetValue,
      value,
    });
  });
  
  // 转换为 VChart 需要的格式
  const nodeArray = Array.from(nodeNames).map(name => ({
    nodeName: name,
  }));
  
  // 将字符串的 source/target 转换为索引
  const nodeMap = new Map(nodeArray.map((node, index) => [node.nodeName, index]));
  const links = tempLinks.map(link => ({
    source: nodeMap.get(link.source) || 0,
    target: nodeMap.get(link.target) || 0,
    value: link.value,
  }));
  
  // 构建 VChart Sankey 配置（基于官方样例）
  const vchartSpec = {
    type: 'sankey',
    animation: false,
    data: [
      {
        values: [
          {
            nodes: nodeArray,
            links,
          }
        ]
      }
    ],
    categoryField: 'nodeName',
    valueField: 'value',
    sourceField: 'source',
    targetField: 'target',
    nodeAlign: 'justify',
    nodeGap: nodeGap || 8,
    nodeWidth: nodeWidth || 20,
    minNodeHeight: 4,
    label: {
      visible: true,
      style: {
        fontSize: 10,
      },
    },
    node: {
      state: {
        hover: {
          stroke: '#333333',
        },
      },
    },
    link: {
      state: {
        hover: {
          fillOpacity: 1,
        },
        selected: {
          fill: '#dddddd',
          stroke: '#333333',
          lineWidth: 1,
          brighter: 1,
          fillOpacity: 1
        }
      },
    },
  };
  return {
    width,
    height,
    vchartSpec,
  };
}