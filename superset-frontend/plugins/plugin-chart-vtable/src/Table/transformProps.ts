import { ChartProps, DataRecord } from '@superset-ui/core';
import { ListTableConstructorOptions } from '@visactor/vtable';
import { VTableTransformedProps } from './types';
import { VizSeedBuilder } from 'yizseed';


export default function transformProps(chartProps: ChartProps): VTableTransformedProps {
  const { width, height, formData, queriesData } = chartProps;
  const {
    groupby = [],
    metrics = [],
    page_length = 0,
    include_search = false,
    order_desc = false,
    show_cell_bars = false,
  } = formData;

  const data = queriesData[0].data as DataRecord[];
  console.log('debug', chartProps);

  // 使用yizseed构建基础table配置
  const builder = new VizSeedBuilder(data);
  const vizSeedDSL = builder
    .setChartType('table')
    .setDimensions([...groupby])
    .setMeasures([...metrics])
    .setStyle({
      theme: 'DEFAULT',
      autoWrapText: true,
    })
    .build();
  
  const vtableSpec = VizSeedBuilder.from(vizSeedDSL).buildSpec();

  // 基于yizseed生成的配置，添加VTable特定的配置
  const vtableOption: ListTableConstructorOptions = {
    ...vtableSpec,
    records: data,
    theme: {
      headerStyle: {
        bgColor: '#f8f9fa',
        fontWeight: 'bold',
        color: '#495057',
        borderColor: '#dee2e6'
      },
      bodyStyle: {
        bgColor: '#ffffff', 
        color: '#333',
        borderColor: '#dee2e6'
      },
      frameStyle: {
        borderColor: '#dee2e6',
        borderLineWidth: 1
      }
    },
    defaultRowHeight: 40,
    defaultColWidth: 150,
    pagination: page_length ? {
      perPageCount: Number(page_length)
    } : false,
  };

  return {
    width,
    height,
    vtableOption,
  };
}