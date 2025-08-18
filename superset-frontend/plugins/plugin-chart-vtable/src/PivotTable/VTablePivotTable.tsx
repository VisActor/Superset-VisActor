import React, { useEffect, useRef } from 'react';
import { PivotTable } from '@visactor/vtable';
import { PivotTableTransformedProps } from './types';

export default function VTablePivotTable(props: PivotTableTransformedProps) {
  const { width, height, vtableOption } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      // 创建 VTable 实例
      const tableInstance = new PivotTable({
        ...vtableOption,
        container: containerRef.current
      });
      
      // 渲染表格
      tableInstance.render();
      
      // 组件卸载时销毁表格
      return () => {
        tableInstance.release();
      };
    }
  }, [width, height, vtableOption]);
  
  return <div ref={containerRef} style={{ width, height }} />;
}
