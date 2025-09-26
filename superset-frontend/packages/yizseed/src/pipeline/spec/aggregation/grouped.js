"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colGrouped = exports.barGrouped = void 0;
const barGrouped = (spec, context) => {
    const encodes = context.encodes[0] || {};
    return Object.assign(Object.assign({}, spec), { yField: [encodes.y, encodes.group] });
};
exports.barGrouped = barGrouped;
const colGrouped = (spec, context) => {
    const encodes = context.encodes[0] || {};
    return Object.assign(Object.assign({}, spec), { xField: [encodes.x, encodes.group] });
};
exports.colGrouped = colGrouped;
//# sourceMappingURL=grouped.js.map