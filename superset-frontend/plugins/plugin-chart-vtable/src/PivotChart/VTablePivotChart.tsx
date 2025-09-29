import React, { useEffect, useRef } from 'react';
import { PivotChart, registerChartCell } from '@visactor/vtable';
import VChart from '@visactor/vchart';
import * as VTable from '@visactor/vtable';
import { PivotChartTransformedProps } from './types';

registerChartCell();
VTable.register.chartModule('vchart', VChart);

export default function VTablePivotChart(props: PivotChartTransformedProps) {
  const { width, height, vtableOption } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      // 创建 VTable PivotChart 实例
      const pivotChartInstance = new PivotChart({
        ...vtableOption,
        container: containerRef.current
      });
      
      // 渲染透视图
      pivotChartInstance.render();
      
      // 组件卸载时销毁实例
      return () => {
        pivotChartInstance.release();
      };
    }
  }, [width, height, vtableOption]);
  
  return <div ref={containerRef} style={{ width, height }} />;
}