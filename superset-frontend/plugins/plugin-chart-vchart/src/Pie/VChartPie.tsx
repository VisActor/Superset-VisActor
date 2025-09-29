import React, { useEffect, useRef } from 'react';
import VChart from '@visactor/vchart';
import { useDebounceValue } from '../hooks/useDebounceValue';
import { PieChartTransformedProps } from './types';

export default function VChartPie(props: PieChartTransformedProps) {
  const { width, height, vchartSpec } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 对vchartSpec进行防抖处理，减少频繁重渲染
  const debouncedSpec = useDebounceValue(vchartSpec, 250);
  
  useEffect(() => {
    if (containerRef.current) {
      // 清除容器内容，避免重复渲染
      containerRef.current.innerHTML = '';
      
      // 创建 VChart 实例，使用防抖后的spec
      const chartInstance = new VChart(debouncedSpec,{
        dom: containerRef.current
      });
      
      // 渲染图表
      chartInstance.renderSync();
      
      // 组件卸载时销毁图表
      return () => {
        chartInstance.release();
      };
    }
  }, [width, height, debouncedSpec]);
  
  return <div ref={containerRef} style={{ width, height }} />;
}
