"use strict";
/**
 * 图例配置步骤
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureLegend = void 0;
// 图例配置步骤
const configureLegend = (spec, context) => {
    const { visualStyle } = context;
    if (!visualStyle)
        return spec;
    return Object.assign(Object.assign({}, spec), { legends: Object.assign(Object.assign({}, visualStyle.legend), { visible: visualStyle.legend.visible !== false }) });
};
exports.configureLegend = configureLegend;
//# sourceMappingURL=Legend.js.map