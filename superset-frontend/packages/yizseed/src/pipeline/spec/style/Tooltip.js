"use strict";
/**
 * 工具提示配置步骤
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureTooltip = void 0;
// 工具提示配置步骤
const configureTooltip = (spec, context) => {
    const { visualStyle } = context;
    if (!visualStyle)
        return spec;
    return Object.assign(Object.assign({}, spec), { tooltip: {
            visible: visualStyle.tooltip !== false
        } });
};
exports.configureTooltip = configureTooltip;
//# sourceMappingURL=Tooltip.js.map