"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_VISUAL_STYLE = exports.createDefaultVisualStyle = void 0;
const createDefaultVisualStyle = () => ({
    title: '',
    color: [],
    legend: {
        visible: true,
        orient: 'right',
        position: 'middle',
    },
    label: {
        visible: true,
    },
    tooltip: {
        visible: true,
    },
    animation: {
        visible: true,
    },
    responsive: {
        widthMode: 'standard',
        heightMode: 'adaptive',
    },
    yAxis: {},
    xAxis: {},
    columnStack: {
        stackRadius: 5,
    },
    pie: {},
    pivotPie: {},
    doughnut: {},
    line: {
        lineStyle: {},
    }
});
exports.createDefaultVisualStyle = createDefaultVisualStyle;
exports.DEFAULT_VISUAL_STYLE = (0, exports.createDefaultVisualStyle)();
//# sourceMappingURL=visualStyleDefaults.js.map