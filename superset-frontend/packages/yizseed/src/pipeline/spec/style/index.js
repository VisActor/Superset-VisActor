"use strict";
/**
 * 样式模块入口
 * 重新导出所有样式配置步骤以保持向后兼容性
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.yyLinearAxis = exports.yBandAxis = exports.yLinearAxis = exports.xLinearAxis = exports.xBandAxis = exports.configureAxes = exports.configureTooltip = exports.configureLabel = exports.configureLegend = void 0;
var Legend_1 = require("./Legend");
Object.defineProperty(exports, "configureLegend", { enumerable: true, get: function () { return Legend_1.configureLegend; } });
var Label_1 = require("./Label");
Object.defineProperty(exports, "configureLabel", { enumerable: true, get: function () { return Label_1.configureLabel; } });
var Tooltip_1 = require("./Tooltip");
Object.defineProperty(exports, "configureTooltip", { enumerable: true, get: function () { return Tooltip_1.configureTooltip; } });
var Axes_1 = require("./Axes");
Object.defineProperty(exports, "configureAxes", { enumerable: true, get: function () { return Axes_1.configureAxes; } });
Object.defineProperty(exports, "xBandAxis", { enumerable: true, get: function () { return Axes_1.xBandAxis; } });
Object.defineProperty(exports, "xLinearAxis", { enumerable: true, get: function () { return Axes_1.xLinearAxis; } });
Object.defineProperty(exports, "yLinearAxis", { enumerable: true, get: function () { return Axes_1.yLinearAxis; } });
Object.defineProperty(exports, "yBandAxis", { enumerable: true, get: function () { return Axes_1.yBandAxis; } });
Object.defineProperty(exports, "yyLinearAxis", { enumerable: true, get: function () { return Axes_1.yyLinearAxis; } });
//# sourceMappingURL=index.js.map