"use strict";
/**
 * 颜色配置步骤
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureColor = void 0;
// 颜色配置步骤
const configureColor = (spec, context) => {
    const { visualStyle } = context;
    if (!visualStyle)
        return spec;
    return Object.assign(Object.assign({}, spec), { color: visualStyle.color });
};
exports.configureColor = configureColor;
//# sourceMappingURL=Color.js.map