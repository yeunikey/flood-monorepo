import { HttpStatus } from '@nestjs/common';
import { DataService } from './data.service';
import { DataValue } from './entities/data_value.entity';
export declare class DataController {
    private readonly dataService;
    constructor(dataService: DataService);
    loadData(data: DataValue[]): Promise<{
        statusCode: number;
        data: DataValue[];
    }>;
    getAllCategory(): Promise<{
        statusCode: number;
        data: import("./entities/category.entity").Category[];
    }>;
    createCategory(body: {
        name: string;
        description: string;
    }): Promise<{
        statusCode: number;
        data: import("typeorm").DeepPartial<import("./entities/category.entity").Category> & import("./entities/category.entity").Category;
    }>;
    categoryVariables(categoryId: number): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: number;
        data: import("./entities/variable.entity").Variable[];
        message?: undefined;
    }>;
    getByCategory(id: number): Promise<{
        statusCode: number;
        data: DataValue[];
    }>;
    getById(id: number): Promise<DataValue | {
        statusCode: HttpStatus;
        message: string;
    }>;
}
