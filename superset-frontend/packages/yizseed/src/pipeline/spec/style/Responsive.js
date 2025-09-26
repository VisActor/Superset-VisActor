"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configResponsive = void 0;
// 数据初始化步骤
const configResponsive = (spec, context) => {
    const { visualStyle } = context;
    // return {
    //   ...spec,
    //   widthMode: visualStyle.responsive.widthMode || 'standard',
    //   heightMode: visualStyle.responsive.heightMode || 'adaptive',
    // }
    return Object.assign(Object.assign({}, spec), { autoFit: true });
};
exports.configResponsive = configResponsive;
//# sourceMappingURL=Responsive.js.map