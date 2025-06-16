import React, { useEffect, useRef } from 'react';
import { createVChart } from '@visactor/vchart';
import { PieChartTransformedProps } from './types';

export default function VChartPie(props: PieChartTransformedProps) {
  const { width, height, vchartSpec } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      // 清除容器内容，避免重复渲染
      containerRef.current.innerHTML = '';
      
      // 创建 VChart 实例
      const chartInstance = createVChart({
        ...vchartSpec,
        container: containerRef.current
      });
      
      // 渲染图表
      chartInstance.render();
      
      // 组件卸载时销毁图表
      return () => {
        chartInstance.dispose();
      };
    }
  }, [width, height, vchartSpec]);
  
  return <div ref={containerRef} style={{ width, height }} />;
}
