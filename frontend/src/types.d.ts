
interface ApiResponse<T> {
    statusCode: number,
    message?: string,
    data: T
}

interface User {
    id: number,
    email: string,
    image?: string
}

export class SavedImage {
    id: string;
    filename: string;
}

export class SavedFile {
    id: string;
    filename: string;
}

export class Layer {
    id: number;
    name: string;
    file: string;
}

// neww

export class Catalog {
    id: number;
    site: Site;
    variable: Variable;
    method: MethodType;
    source: DataSource;
}

export class Category {
    id: number;
    name: string;
    description: string;
}

export class DataSource {
    id: number;
    name: string;
}

export class DataValue {
    id: number;
    catalog: Catalog;
    category: Category;
    date_utc: Date;
    value: number;
    qcl: Qcl;
}

export class MethodType {
    id: number;
    name: string;
    description: string;
}

export class Qcl {
    id: number;
    name: string;
    description: string;
}

export class SiteType {
    id: number;
    name: string;
    description: string;
}

export class Site {
    id: number;
    code: string;
    name: string;
    siteType: SiteType;
    longtitude: number;
    latitude: number;
}

export class Unit {
    id: number;
    name: string;
    symbol: string;
    description: string;
}

export class Variable {
    id: number;
    name: string;
    unit: Unit;
    description: string;
}

export {
    User,
    ApiResponse,
    Site,
    SiteType,
    SavedImage,
    SavedFile,
    Layer,
    Catalog,
    Category,
    Variable,
    DataValue
}