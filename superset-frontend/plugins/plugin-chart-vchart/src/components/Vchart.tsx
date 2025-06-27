/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, {
  useRef,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useCallback,
  Ref,
  useState,
} from 'react';

import { useSelector } from 'react-redux';
import { styled } from '@superset-ui/core';
import { VChart } from '@visactor/react-vchart';
import { PieChart } from '@visactor/react-vchart';
import {
  // 坐标轴组件
  Axis,
  // 图例组件
  Legend,
  // Brush组件
  Brush,
  // Crosshair组件
  Crosshair,
  // DataZoom 组件
  DataZoom,
  // Indicator 组件
  Indicator,
  MarkArea,
  MarkLine,
  MarkPoint,
  Player,
  ScrollBar,
  Title,
  Tooltip,
  // 自定义图元系列
  Mark,
  //
  Region
} from '@visactor/react-vchart';

interface VchartProps {
  width: number;
  height: number;
  spec: any; // VChart 的配置对象
  eventHandlers?: Record<string, Function>;
  selectedValues?: Record<string, any>;
  refs?: {
    divRef?: React.RefObject<HTMLDivElement>;
  };
}

// 定义组件暴露给父组件的方法接口
interface VchartHandler {
  getVchartInstance: () => VChart | undefined;
}

// 定义样式组件的 Props 接口
interface VchartStylesProps {
  width: number;
  height: number;
}

// 使用 styled-components 创建样式化组件
const Styles = styled.div<VchartStylesProps>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`;

function VchartComponent(
  {
    width,
    height,
    spec,
    eventHandlers,
    selectedValues = {},
    refs,
  }: VchartProps,
  ref: Ref<VchartHandler>,
) {
  // 创建 DOM 容器的 ref
  const divRef = useRef<HTMLDivElement>(null);
  if (refs) {
    refs.divRef = divRef;
  }

  // 状态管理
  const [didMount, setDidMount] = useState(false);
  const chartRef = useRef<VChart>();

  // 处理选中状态
  const currentSelection = useMemo(
    () => Object.keys(selectedValues) || [],
    [selectedValues],
  );
  const previousSelection = useRef<string[]>([]);

  // 暴露图表实例给父组件
  useImperativeHandle(ref, () => ({
    getVchartInstance: () => chartRef.current,
  }));

  // 获取语言环境
  const locale = useSelector(
    (state: any) => state?.common?.locale ?? 'zh-CN',
  );

  // 处理尺寸变化
  const handleSizeChange = useCallback(
    ({ width, height }: { width: number; height: number }) => {
      if (chartRef.current) {
        chartRef.current.resize(width, height);
      }
    },
    [],
  );

  // 初始化图表
  useEffect(() => {
    if (!divRef.current) return;
    if (!chartRef.current) {
      // 创建 VChart 实例
      chartRef.current = new VChart({
        ...spec,
        dom: divRef.current,
        width,
        height,
        locale,
      });
      chartRef.current.renderSync();
      setDidMount(true);
    }
  }, [spec, width, height, locale]);

  // 处理事件和配置更新
  useEffect(() => {
    if (didMount && chartRef.current) {
      // 更新事件处理器
      Object.entries(eventHandlers || {}).forEach(([name, handler]) => {
        chartRef.current?.off(name);
        chartRef.current?.on(name, handler);
      });

      // 更新图表配置
      chartRef.current.updateSpec(spec);
      handleSizeChange({ width, height });
    }
  }, [didMount, spec, eventHandlers, width, height]);

  // 清理资源
  useEffect(() => () => chartRef.current?.release(), []);

  // 处理选中状态变化
  useEffect(() => {
    if (!chartRef.current) return;
    // 根据 VChart 的 API 实现高亮逻辑
    // 这里需要根据具体的 VChart API 来实现
    previousSelection.current = currentSelection;
  }, [currentSelection]);

  // 处理尺寸变化
  useLayoutEffect(() => {
    handleSizeChange({ width, height });
  }, [width, height, handleSizeChange]);

  return <Styles ref={divRef} height={height} width={width} />;
}

export default forwardRef(VchartComponent);