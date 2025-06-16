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
// 引入坐标轴、提示信息、十字准星组件


import { VchartHandler, VchartProps, VchartStylesProps } from '../types';
import { DEFAULT_LOCALE } from '../constants'; // 假设有这个常量文件

// TODO: 从 @superset-ui/core 或其他地方移动 ExplorePageState 类型定义
interface ExplorePageState {
  common: {
    locale: string;
  };
}

const Styles = styled.div<VchartStylesProps>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px; 
`;

// VChart 不需要像 ECharts 那样显式 use 组件和渲染器
// VChart 的 locale 处理方式也不同，通常在初始化时传入

function VchartComponent(
  {
    width,
    height,
    vchartSpec, // VChart 使用 spec 定义图表
    eventHandlers, // VChart 的事件处理
    // zrEventHandlers, // VChart 没有 zrEventHandlers
    selectedValues = {},
    refs,
  }: VchartProps,
  ref: Ref<VchartHandler>,
) {
  const divRef = useRef<HTMLDivElement>(null);
  if (refs) {
    // eslint-disable-next-line no-param-reassign
    refs.divRef = divRef;
  }
  const [didMount, setDidMount] = useState(false);
  const chartRef = useRef<IVChart>(); // VChart 实例类型

  // VChart 的选中值处理逻辑可能不同，需要根据 VChart API 调整
  const currentSelection = useMemo(
    () => Object.keys(selectedValues) || [],
    [selectedValues],
  );
  const previousSelection = useRef<string[]>([]);

  useImperativeHandle(ref, () => ({
    getVchartInstance: () => chartRef.current,
  }));

  const locale = useSelector(
    (state: ExplorePageState) => state?.common?.locale ?? DEFAULT_LOCALE,
  );

  const handleSizeChange = useCallback(
    ({ width, height }: { width: number; height: number }) => {
      if (chartRef.current) {
        // VChart 的 resize 方法
        chartRef.current.resize(width, height);
      }
    },
    [],
  );

  useEffect(() => {
    // VChart 的国际化通常在初始化 spec 时配置，或者通过 API 设置
    // VChart.setLocale(locale); // 假设有这样的 API
    if (!divRef.current) return;
    if (!chartRef.current) {
      // 创建 VChart 实例
      // 注意：VChart 的构造函数参数与 ECharts 不同
      // 通常是 (spec, options)，其中 options 可以包含 dom, width, height 等
      chartRef.current = new VChart(vchartSpec, { dom: divRef.current, width, height, locale });
      chartRef.current.renderSync(); // 或者 renderAsync
    }
    setDidMount(true);
  }, [locale, vchartSpec, width, height]); // vchartSpec 变化时可能需要重新渲染或更新

  useEffect(() => {
    if (didMount && chartRef.current) {
      // VChart 事件处理
      Object.entries(eventHandlers || {}).forEach(([name, handler]) => {
        // VChart 的事件绑定/解绑 API 可能不同
        // chartRef.current.off(name, handler); // 先解绑旧的
        // chartRef.current.on(name, handler); // 绑定新的
      });

      // 如果 vchartSpec 更新，可能需要调用 chartRef.current.updateSpec(vchartSpec)
      // 或者重新创建实例，取决于 VChart 的 API 和性能考虑

      handleSizeChange({ width, height });
    }
  }, [didMount, vchartSpec, eventHandlers, width, height, handleSizeChange]);

  useEffect(() => () => chartRef.current?.release(), []); // VChart 销毁实例的方法是 release

  // VChart 的高亮逻辑需要根据其 API 实现
  useEffect(() => {
    if (!chartRef.current) return;
    // 示例：VChart 可能通过 updateState 或类似 API 实现高亮
    // chartRef.current.updateState(...);
    previousSelection.current = currentSelection;
  }, [currentSelection, chartRef.current]);

  useLayoutEffect(() => {
    handleSizeChange({ width, height });
  }, [width, height, handleSizeChange]);

  return <Styles ref={divRef} height={height} width={width} />;
}

export default forwardRef(VchartComponent);