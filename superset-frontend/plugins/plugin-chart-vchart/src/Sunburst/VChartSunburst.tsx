import React, { useEffect, useRef } from 'react';
import VChart from '@visactor/vchart';
import { SunburstChartTransformedProps } from './types';

export default function VChartSunburst(props: SunburstChartTransformedProps) {
  const { width, height, vchartSpec } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      
      const chartInstance = new VChart(vchartSpec, {
        dom: containerRef.current
      });
      
      chartInstance.renderSync();
      
      return () => {
        chartInstance.release();
      };
    }
  }, [width, height, vchartSpec]);
  
  return <div ref={containerRef} style={{ width, height }} />;
}