import { DataSource } from "./data_source.entity";
import { MethodType } from "./method_type.entity";
import { Site } from "src/data/entities/site";
import { Variable } from "./variable.entity";
export declare class Catalog {
    id: number;
    site: Site;
    variable: Variable;
    method: MethodType;
    source: DataSource;
}
