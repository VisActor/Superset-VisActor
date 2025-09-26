"use strict";
/**
 * 配置Pie的style内容
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePieStyle = void 0;
const configurePieStyle = (spec, context) => {
    const { visualStyle } = context;
    if (!visualStyle)
        return spec;
    return Object.assign(Object.assign({}, spec), visualStyle.pie);
};
exports.configurePieStyle = configurePieStyle;
//# sourceMappingURL=PieStyle.js.map