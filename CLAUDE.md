# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Apache Superset 的可视化分析平台，增强了 VisActor（VTable 和 VChart）组件集成。项目包含：

1. **Apache Superset 核心** - Python 后端 BI 平台
2. **Frontend** - React/TypeScript 前端应用
3. **VTable 插件** - 基于 @visactor/vtable 的透视表组件 
4. **VChart 插件** - 基于 @visactor/vchart 的图表组件

## 常用开发命令

### 后端开发
```bash
# 安装 Python 依赖并初始化
make install

# 运行后端开发服务器
superset run -p 8088 --with-threads --reload --debugger

# 数据库迁移
superset db upgrade

# 运行 Python 测试
pytest tests/

# 运行特定测试文件
pytest tests/unit_tests/test_file.py
```

### 前端开发
```bash
cd superset-frontend

# 安装依赖
npm ci

# 开发模式构建（监听文件变化）
npm run dev

# 生产构建
npm run build

# 运行前端测试
npm test

# 运行 ESLint
npm run lint

# 运行类型检查
npm run type-check
```

### VTable/VChart 插件开发
```bash
cd superset-frontend/plugins/plugin-chart-vtable
# 或
cd superset-frontend/plugins/plugin-chart-vchart

# TypeScript 编译
npm run tsc

# 运行插件测试
npm test
```

## 代码架构

### 核心目录结构
- `superset/` - Python 后端核心代码
- `superset-frontend/` - React 前端代码
- `superset-frontend/plugins/` - 图表插件
- `superset-frontend/src/` - 前端核心组件和工具
- `tests/` - Python 测试
- `superset-frontend/spec/` - 前端测试

### VTable 插件架构 (plugin-chart-vtable)
- `src/PivotTable/` - 透视表实现
  - `VTablePivotTable.tsx` - React 组件
  - `transformProps.ts` - 数据转换逻辑
  - `controlPanel.tsx` - 控制面板配置
  - `buildQuery.ts` - 查询构建
  - `types.ts` - TypeScript 类型定义

### 数据流
1. **查询构建**: `buildQuery.ts` 构造数据查询
2. **数据转换**: `transformProps.ts` 将 Superset 数据转换为 VTable 格式
3. **组件渲染**: React 组件使用转换后的数据渲染 VTable
4. **控制面板**: `controlPanel.tsx` 定义用户可配置的选项

## 开发规范

### TypeScript
- 严格类型检查已启用
- 使用 `@superset-ui/core` 提供的类型
- 为 VTable/VChart 相关代码定义专门的类型

### React 组件
- 使用函数组件和 Hooks
- Props 需要明确的 TypeScript 类型定义
- 遵循 Superset 的样式指南（使用 Emotion CSS-in-JS）

### 测试
- Python: 使用 pytest，测试文件命名为 `*_test.py` 或 `test_*.py`
- Frontend: 使用 Jest + React Testing Library
- 插件需要包含单元测试

### 国际化
- 前端使用 `t()` 函数进行文本国际化
- 新增文本需要添加到翻译文件中

## 插件开发注意事项

### VTable 集成
- 使用 `@visactor/vtable` 作为透视表引擎
- 数据格式转换在 `transformProps.ts` 中处理
- 支持动态主题和样式配置

### 性能优化
- VTable 支持虚拟滚动处理大数据集
- 使用 `pagination` 配置限制单页数据量
- 避免在 `transformProps` 中进行复杂计算

### 调试
- 使用 `console.log('debug', chartProps)` 查看传入数据
- VTable 实例可以通过 ref 访问进行调试
- 浏览器开发工具可以检查生成的表格结构

## 常见问题排查

### 构建失败
1. 检查 Node.js 版本 (需要 16+)
2. 清除缓存: `rm -rf node_modules package-lock.json && npm ci`
3. 检查 TypeScript 错误: `npm run tsc`

### VTable 渲染问题
1. 确认容器元素正确设置
2. 检查数据格式是否符合 VTable 要求
3. 验证 transformProps 返回的配置

### 后端集成问题
1. 确认 Python 环境和依赖
2. 检查数据库连接和迁移状态
3. 查看 Superset 日志输出
EOF < /dev/null