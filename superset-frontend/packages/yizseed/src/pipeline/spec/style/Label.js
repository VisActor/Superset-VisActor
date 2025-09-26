"use strict";
/**
 * 标签配置步骤
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureLabel = void 0;
// 标签配置步骤
const configureLabel = (spec, context) => {
    const { visualStyle } = context;
    if (!visualStyle)
        return spec;
    return Object.assign(Object.assign({}, spec), { label: Object.assign(Object.assign({}, visualStyle.label), { visible: visualStyle.label.visible !== false }) });
};
exports.configureLabel = configureLabel;
//# sourceMappingURL=Label.js.map