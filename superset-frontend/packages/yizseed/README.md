# VizSeed - 数据可视化维度重塑与图表生成工具

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)
[![Build](https://img.shields.io/badge/Build-Passing-brightgreen)](https://github.com/xxyyffyeah/VizSeed)

VizSeed 是一个创新的数据可视化维度重塑与图表生成工具，基于 TypeScript 开发。它提供了一套领域特定语言（DSL），用于简化数据处理复杂度，将原始数据转换为适合绘图的目标结构。通过函数式 Pipeline 架构支持多个主流图表库（VChart、ECharts、VTable），提供统一的抽象层。

## 🎯 设计理念

VizSeed 解决了数据可视化中的核心问题：**维度与指标的相对性**。同一个字段在不同场景下可以作为维度或指标使用，传统工具需要用户手动处理数据结构，而 VizSeed 通过维度重塑操作，让数据自动适配图表需求。

### 💡 核心创新点

1. **🔄 维度重塑方法**: 提供升维、降维、分组升降维等操作，简化数据处理复杂度
2. **📊 多图表库统一**: 一套DSL生成VChart、ECharts、VTable等多库规范，降低学习成本
3. **🏗️ 函数式Pipeline**: 模块化处理流程，支持按需加载和可组合的数据变换
4. **⚡ 智能通道映射**: 根据图表类型自动选择最佳的数据-视觉通道映射策略
5. **🛡️ 完整类型集成**: 集成官方TypeScript类型定义，确保类型安全和智能提示
6. **🌐 Web交互界面**: 实时可视化配置、预览和代码生成功能

## ✨ 核心特性

### 🎨 支持图表类型（17种）

#### VChart & ECharts 支持
- **基础图表**: bar, column, line, area, scatter, pie
- **堆叠变体**: bar_stacked, column_stacked, area_stacked  
- **分组变体**: bar_grouped, column_grouped
- **百分比变体**: bar_percent, column_percent, area_percent

#### VTable 支持
- **数据表格**: table

### 🏗️ 架构特性

- **🔧 构造者模式**: 流畅的链式API，简化复杂配置
- **⚙️ 策略模式**: 图表库解耦设计，易于扩展新库
- **📦 按需加载**: 真正的动态import，减少初始包体积
- **🧩 模块化设计**: 68个源码文件，高度解耦的函数式架构
- **🔍 智能验证**: 自动检查图表类型与图表库兼容性
- **📊 数据处理**: 支持复杂的维度重塑和数据变换操作

## 🚀 快速开始

### 📦 安装与运行

```bash
# 安装依赖
npm install

# 编译项目
npm run build

# 启动完整开发环境（推荐）
npm run dev:full
# 访问 http://localhost:3000

# 运行基础示例
npm run example
```

### 🌐 Web界面开发

VizSeed 提供了功能完整的Web交互界面：

```bash
# 完整开发环境（前端 + WebSocket服务器）
npm run dev:full

# 单独启动前端界面
npm run web:dev      # 前端开发服务器（端口3000）

# 单独启动后端服务
npm run server:ts    # WebSocket服务器（端口8080）
```

#### 🎯 Web界面功能
- **📝 实时VizSeed IDE**: Monaco编辑器，语法高亮和智能提示
- **📊 多库图表渲染**: 支持ECharts、VChart、VTable实时渲染
- **⚙️ 交互式配置面板**: 可视化参数调整和预览
- **🔍 规范查看器**: 查看生成的官方图表规范
- **📋 执行日志**: 详细的处理过程和错误追踪

## 📋 基本用法

### 🎨 简单示例

```typescript
import { VizSeedBuilder } from 'vizseed';

// 销售数据
const salesData = [
  { category: '水果', sales: 100, profit: 20 },
  { category: '蔬菜', sales: 80, profit: 15 },
  { category: '肉类', sales: 120, profit: 25 }
];

// 创建饼图
const builder = new VizSeedBuilder(salesData);

const vizSeedDSL = await builder
  .setChartType('pie')
  .setDimensions(['category'])
  .setMeasures(['sales'])
  .build();

// 生成VChart规范
const vchartSpec = await VizSeedBuilder.from(vizSeedDSL).buildSpec();

// 查看支持的图表库和类型
console.log(builder.getSupportedLibraries());     // ['vchart', 'vtable', 'echarts']
console.log(builder.getAllSupportedChartTypes()); // 各库支持的类型映射
```

### 📊 多图表类型示例

```typescript
// 堆叠柱状图
const stackedChart = await new VizSeedBuilder(salesData)
  .setChartType('column_stacked')
  .setDimensions(['store', 'city'])
  .setMeasures(['sales', 'profit'])
  .build();

// 时间序列折线图
const timeSeriesData = [
  { month: '2024-01', product: '手机', sales: 15000 },
  { month: '2024-01', product: '平板', sales: 8000 },
  // ...更多数据
];

const lineChart = await new VizSeedBuilder(timeSeriesData)
  .setChartType('line')
  .setDimensions(['month', 'product'])
  .setMeasures(['sales'])
  .build();

// 散点图
const scatterChart = await new VizSeedBuilder(salesData)
  .setChartType('scatter')
  .setDimensions(['profit'])
  .setMeasures(['sales'])
  .build();
```

### 🔄 维度重塑操作

VizSeed 的核心功能是维度重塑，解决数据结构与图表需求不匹配的问题：

```typescript
const builder = new VizSeedBuilder(originalData);

// 支持多种数据变换操作
const vizSeed = await builder
  .setChartType('bar')
  .setDimensions(['category'])  
  .setMeasures(['sales'])
  // 其他维度操作可在pipeline中实现
  .build();
```

## 🏗️ 架构设计

### 📐 整体架构图

```
用户数据 ──► VizSeedBuilder ──► Pipeline系统 ──► 图表规范
Raw Data      构造者模式       函数式管道      Multi-Library Specs
    │             │               │                 │
    │             │               │                 ├── VChart
    │             │               │                 ├── ECharts  
    │             │               │                 └── VTable
    │             │               │
   数据集      链式API构建    双阶段Pipeline        策略模式
```

### 🔧 Pipeline架构详解

VizSeed 采用**双阶段函数式Pipeline**架构：

#### 阶段一：VizSeed Pipeline（数据处理）
```
VizSeedInitModule → ChartAdapterModule → DataReshapeModule → ChannelMapping → VizSeedCleanupModule
      │                    │                   │                  │                    │
   基础初始化           图表适配            数据重塑            通道映射            清理优化
```

#### 阶段二：Spec Pipeline（规范生成）
```
DataModule → 图表初始化 → StyleModule → 聚合处理 → 图表规范
     │           │           │           │          │
  数据初始化   类型特定初始化   样式配置    聚合策略   最终输出
```

### 📁 项目结构

```
src/
├── builder/VizSeedBuilder.ts          # 🏗️ 构造者模式核心类
├── datasets/DataSet.ts                # 📊 数据集管理
├── pipeline/                          # ⚙️ Pipeline架构核心（52个文件）
│   ├── PipelineCore.ts                #   - Pipeline基础设施
│   ├── PipelineRegistry.ts            #   - 按需加载注册表
│   ├── vizSeed/                       #   - VizSeed构建Pipeline
│   │   ├── channelMapping/            #     - 智能通道映射（5个文件）
│   │   ├── dataReshape/               #     - 数据重塑模块
│   │   └── vizSeedPipelines/          #     - 图表类型Pipeline
│   └── spec/                          #   - 图表规范生成Pipeline
│       ├── init/                      #     - 图表初始化（9个文件）
│       ├── specPipelines/             #     - 17种图表Pipeline
│       └── style/                     #     - 样式配置模块
├── types/                             # 🛡️ 完整类型定义（4个文件）
└── utils/DataProcessor.ts             # 🔧 数据处理工具

web/                                   # 🌐 Web交互界面
├── src/components/                    #   - React组件
└── index.html                         #   - 入口页面

server/                                # 🖥️ 服务器
├── websocket-server.ts                #   - WebSocket服务器（推荐）
└── simple-server.ts                   #   - HTTP服务器

examples/                              # 📚 完整示例库（13个文件）
├── bar.ts, line.ts, pie.ts           #   - 基础图表
├── column_stacked.ts, area_percent.ts #   - 图表变体
└── outputs/                           #   - 输出文件
```

## 📊 图表库兼容性

### 📈 支持矩阵

| 图表类型 | VChart | ECharts | VTable | 变体支持 |
|---------|--------|---------|--------|----------|
| **柱状图系列** |
| bar | ✅ | ✅ | ❌ | stacked, grouped, percent |
| column | ✅ | ✅ | ❌ | stacked, grouped, percent |
| **趋势图系列** |
| line | ✅ | ✅ | ❌ | - |
| area | ✅ | ✅ | ❌ | stacked, percent |
| **分析图系列** |
| scatter | ✅ | ✅ | ❌ | linear |
| pie | ✅ | ✅ | ❌ | - |
| **数据表格** |
| table | ❌ | ❌ | ✅ | - |

### ⚠️ 重要说明

- **VChart限制**: 不支持donut（环形图），请使用pie类型
- **类型安全**: 系统会自动检查图表类型与库的兼容性
- **按需加载**: 只有使用的图表类型会被加载

## 🔧 开发指南

### 📋 环境要求

- **Node.js**: 18+
- **TypeScript**: 5.8+
- **npm**: 10+

### 🛠️ 开发脚本

```bash
# 核心开发
npm run build              # 编译TypeScript到dist/
npm run dev                # 直接运行TypeScript源码  
npm run watch              # 监听文件变化自动重编译
npm run start              # 运行编译后的代码

# Web界面开发
npm run dev:full           # 完整开发环境（推荐）
npm run web:dev            # 前端开发服务器（端口3000）
npm run web:build          # 构建前端生产版本
npm run web:preview        # 预览构建后的前端

# 服务器
npm run server:ts          # WebSocket服务器（端口8080）
npm run server:dev         # HTTP服务器

# 示例和测试
npm run example            # 运行基础示例
```

### 🔨 添加新图表类型

1. **更新类型定义**
```typescript
// src/types/charts.ts
export enum ChartType {
  // 添加新类型
  NEW_CHART = 'new_chart'
}
```

2. **创建Pipeline文件**
```typescript
// src/pipeline/spec/specPipelines/NewChart.ts
export const createNewChartSpecPipeline = () => pipeline([
  initVChartNewChart,
  initData,
  // 其他处理步骤
], {});
```

3. **更新注册表**
```typescript
// src/pipeline/PipelineRegistry.ts
[ChartType.NEW_CHART]: () => import('./spec/specPipelines/NewChart')
  .then(m => m.createNewChartSpecPipeline),
```

4. **创建示例文件**
```typescript
// examples/new_chart.ts
import { VizSeedBuilder } from '../src';
// 示例实现
```

## 📚 示例库

项目包含13个完整示例，覆盖所有支持的图表类型：

```bash
examples/
├── bar.ts              # 基础水平条形图
├── line.ts             # 多线折线图（时间序列）
├── pie.ts              # 饼图（多维度）
├── scatter.ts          # 散点图
├── donut.ts            # 环形图
├── table.ts            # 数据表格
├── column_stacked.ts   # 堆叠垂直条形图
├── column_grouped.ts   # 分组垂直条形图
├── column_percent.ts   # 百分比垂直条形图
├── area_stacked.ts     # 堆叠面积图
├── area_percent.ts     # 百分比面积图
├── bar_stacked.ts      # 堆叠水平条形图
├── bar_grouped.ts      # 分组水平条形图
└── outputs/            # 生成的规范文件
```

每个示例都包含：
- 📊 完整的数据定义
- ⚙️ VizSeed配置
- 📄 生成的图表规范
- 💾 自动保存到web界面

## 🎯 使用场景

### 👩‍💻 前端开发者
- 快速生成图表配置
- 多图表库间迁移
- 统一的图表开发体验

### 📊 数据分析师  
- 可视化配置界面
- 实时数据预览
- 无代码图表生成

### 🏢 企业应用
- 标准化图表规范
- 一致的视觉风格
- 可扩展的架构设计

## 🔮 未来规划

- [ ] **更多图表库支持**: D3.js、Observable Plot等
- [ ] **高级数据操作**: 数据聚合、过滤、排序等
- [ ] **模板系统**: 预定义图表模板和主题
- [ ] **插件架构**: 自定义扩展和第三方插件
- [ ] **性能优化**: 大数据集处理和流式更新
- [ ] **协作功能**: 图表分享和团队协作

## 🤝 贡献

欢迎提交Issue和Pull Request！请参考：

1. Fork项目仓库
2. 创建功能分支：`git checkout -b feature/新功能`
3. 提交更改：`git commit -m 'feat: 添加新功能'`
4. 推送分支：`git push origin feature/新功能`
5. 提交Pull Request

## 📄 许可证

本项目采用 [ISC许可证](LICENSE)。

## 🙏 致谢

感谢以下开源项目和贡献者：

- [VChart](https://github.com/VisActor/VChart) - 字节跳动数据可视化解决方案
- [ECharts](https://github.com/apache/echarts) - Apache顶级数据可视化项目
- [VTable](https://github.com/VisActor/VTable) - 高性能数据表格组件
- [TypeScript](https://github.com/microsoft/TypeScript) - Microsoft类型安全的JavaScript超集
- [Vite](https://github.com/vitejs/vite) - 下一代前端构建工具

---

**⭐ 如果这个项目对你有帮助，请给个Star支持一下！**

[![GitHub stars](https://img.shields.io/github/stars/xxyyffyeah/VizSeed?style=social)](https://github.com/xxyyffyeah/VizSeed)