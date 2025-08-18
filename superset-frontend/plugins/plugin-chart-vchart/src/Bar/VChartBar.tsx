import React, { useEffect, useRef } from 'react';
import VChart from '@visactor/vchart';
import { useDebounceValue } from '../hooks/useDebounceValue';
import { BarChartTransformedProps } from './types';

export default function VChartBar(props: BarChartTransformedProps) {
  const { width, height, vchartSpec } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const debouncedSpec = useDebounceValue(vchartSpec, 250);
  
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      
      const chartInstance = new VChart(debouncedSpec, {
        dom: containerRef.current
      });
      
      chartInstance.renderSync();
      
      return () => {
        chartInstance.release();
      };
    }
  }, [width, height, debouncedSpec]);
  
  return <div ref={containerRef} style={{ width, height }} />;
}