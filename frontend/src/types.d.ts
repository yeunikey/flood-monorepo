
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

interface Site {
    id: number;
    code: string;
    name: string;
    siteType: SiteType;
    longtitude: number;
    altitude: number;
}

interface SiteType {
    id: number;
    name: string;
    description: string;
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

export {
    User,
    ApiResponse,
    Site,
    SiteType,
    SavedImage,
    SavedFile,
    Layer
}