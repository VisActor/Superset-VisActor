import { ChartMetadata, ChartPlugin, t } from '@superset-ui/core';
// import controlPanel from './controlPanel'; // 需要创建控制面板配置文件
// import transformProps from './transformProps'; // 需要创建数据转换函数
// import buildQuery from './buildQuery'; // 需要创建查询构建函数
// import thumbnail from './images/thumbnail.png'; // 需要准备缩略图

// 基础插件类，可以参考 EchartsChartPlugin
// export class VchartChartPlugin<...> extends ChartPlugin<...> { /* ... */ }

export default class VchartPieChartPlugin extends ChartPlugin /* or VchartChartPlugin */ {
  constructor() {
    super({
      // buildQuery, // 定义如何从表单数据构建查询
      // controlPanel, // 定义图表的控制面板配置项
      loadChart: () => import('./VchartPie'), // 异步加载图表组件
      metadata: new ChartMetadata({
        name: t('VChart Pie Chart'), // 插件名称
        description: t('A pie chart using VChart.'), // 插件描述
        // credits: ['https://visactor.io/vchart'], // VChart 的相关链接
        // thumbnail, // 插件的缩略图
        // ... 其他元数据，例如 category, tags, behaviors
        // 参考 EchartsGraphChartPlugin 的 metadata
        parseMethod: 'json-bigint', // 或者其他适合的数据解析方法
      }),
      // transformProps, // 定义如何将查询结果和表单数据转换为图表组件的 props
    });
  }
}