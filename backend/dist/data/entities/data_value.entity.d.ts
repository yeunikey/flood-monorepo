import { Catalog } from "./catalog.entity";
import { Category } from "./category.entity";
import { Qcl } from "./qcl.entity";
export declare class DataValue {
    id: number;
    catalog: Catalog;
    category: Category;
    date_utc: Date;
    value: number;
    qcl: Qcl;
}
