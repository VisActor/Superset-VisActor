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
import { RefObject, Ref } from 'react';

import {
    ChartDataResponseResult,
    ChartProps,
    ContextMenuFilters,
    FilterState,
    HandlerFunction,
    LegendState,
    PlainObject,
    QueryFormColumn,
    SetDataMaskHook,
    ChartPlugin,
    SqlaFormData,
    ChartMetadata,
  } from '@superset-ui/core';
import type { EChartsCoreOption, EChartsType } from 'echarts/core';

export type VchartStylesProps = {
  height: number;
  width: number;
};

export interface VchartProps {
    height: number;
    width: number;
    vchartOptions: EChartsCoreOption;
    eventHandlers?: EventHandlers;
    zrEventHandlers?: EventHandlers;
    selectedValues?: Record<number, string>;
    forceClear?: boolean;
    refs: Refs;
}