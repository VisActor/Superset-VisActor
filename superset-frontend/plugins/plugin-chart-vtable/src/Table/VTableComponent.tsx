import React, { useEffect, useRef } from 'react';
import { ListTable } from '@visactor/vtable';
import { VTableTransformedProps } from './types';



export default function VTableComponent({
  width,
  height,
  vtableOption,
}: VTableTransformedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // 创建 VTable 实例
      const tableInstance = new ListTable({
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