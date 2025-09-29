import { ChartProps, DataRecord } from '@superset-ui/core';
import { PivotChartConstructorOptions } from '@visactor/vtable';
import { VTableTransformedProps } from './types';
import { VizSeedBuilder } from 'yizseed';

export default function transformProps(chartProps: ChartProps): VTableTransformedProps {
  const { width, height, formData, queriesData } = chartProps;
  const {
    groupbyRows = [],
    groupbyColumns = [],
    metrics = [],
    chartType = 'column',
    chartDimensions = [],
  } = formData;

  const data = queriesData[0].data as DataRecord[];
  console.log('transformProps data', data);
  console.log('debug pivotchart', chartProps);
  console.log('groupbyRows', groupbyRows);
  console.log('groupbyColumns', groupbyColumns);
  console.log('metrics', metrics);  
  console.log('chartDimensions', chartDimensions);
  console.log('chartType', chartType);

  // 创建子图的VizSeedDSL
  const createIndicatorDSL = (chartType: string, dimensions: string[], measures: string[]) => {
    return new VizSeedBuilder(data)
      .setChartType(chartType)
      .setDimensions(dimensions)
      .setMeasures(measures)
      .build();
  };

  // 提取指标标签
  const metricLabels = metrics.map((metric: any) => 
    typeof metric === 'string' ? metric : metric.label
  );
  
  // 为每个指标创建对应的图表DSL，使用指定的图表类型
  const indicatorDSLs: Record<string, any> = {};
  metricLabels.forEach((metricLabel: string) => {
    const chartConfig = {
      chartType: chartType,
      dimensions: chartDimensions,
      measures: [metricLabel]
    };
    
    indicatorDSLs[metricLabel] = createIndicatorDSL(
      chartConfig.chartType,
      chartConfig.dimensions,
      chartConfig.measures
    );
  });

  // 使用yizseed构建pivotchart配置
  const builder = new VizSeedBuilder(data);
  let vizSeedDSL = builder
    .setChartType('pivotchart')
    .setRowDimensions(groupbyRows)
    .setColumnDimensions(groupbyColumns)
    .setMeasures(metricLabels);

  // 为每个指标设置图表配置
  metricLabels.forEach((metricLabel: string) => {
    vizSeedDSL = vizSeedDSL.setIndicatorChart(metricLabel, indicatorDSLs[metricLabel]);
  });

  vizSeedDSL = vizSeedDSL.setStyle({
    theme: 'DEFAULT',
    autoWrapText: true,
    corner: {
      titleOnDimension: 'row'
    }
  });

  const finalDSL = vizSeedDSL.build();
  
  // 生成VTable透视图规范
  const vtablePivotChartSpec = VizSeedBuilder.from(finalDSL).buildSpec();

  // 基于yizseed生成的配置，添加VTable特定的配置
  const vtableOption: PivotChartConstructorOptions = {
    ...vtablePivotChartSpec,
    defaultRowHeight: 60,
    defaultColWidth: 200,
  };
  console.log('vtableOption', vtableOption);
  console.log('finalDSL', finalDSL);
  console.log('vtablePivotChartSpec', vtablePivotChartSpec);

  return {
    width,
    height,
    vtableOption,
  };
}