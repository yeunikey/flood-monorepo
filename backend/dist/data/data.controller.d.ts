import { DataService } from './data.service';
import { DataValue } from './entities/data_value.entity';
export declare class DataController {
    private readonly dataService;
    constructor(dataService: DataService);
    loadData(data: DataValue[]): Promise<DataValue[]>;
    getByCategory(name: string): Promise<DataValue[]>;
    getById(id: number): Promise<DataValue>;
}
