import { ChartType } from './charts';
import { ChartSpec } from './specs';
export type NestedMeasure<T> = T | NestedMeasure<T>[];
export interface VizSeedBuilder {
    setDimensions(dimensions: string[]): VizSeedBuilder;
    setMeasures(measures: NestedMeasure<string>[]): VizSeedBuilder;
    addDimensionToArray(dimension: string): VizSeedBuilder;
    addMeasureToArray(measure: string): VizSeedBuilder;
    getDimensions(): string[];
    getMeasures(): string[];
    setChartType(type: ChartType): VizSeedBuilder;
    build(): any;
    buildSpec(): ChartSpec;
}
//# sourceMappingURL=dsl.d.ts.map