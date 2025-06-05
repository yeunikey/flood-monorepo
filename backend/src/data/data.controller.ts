import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    NotFoundException,
} from '@nestjs/common';
import { DataService } from './data.service';
import { DataValue } from './entities/data_value.entity';

@Controller('data')
export class DataController {
    constructor(private readonly dataService: DataService) { }

    // Загрузка массива значений
    @Post()
    async loadData(@Body() data: DataValue[]): Promise<DataValue[]> {
        return this.dataService.loadDataValues(data);
    }

    // Поиск по категории
    @Get('category/:name')
    async getByCategory(@Param('name') name: string): Promise<DataValue[]> {
        const results = await this.dataService.findByCategoryName(name);
        if (!results.length) {
            throw new NotFoundException(`No data found for category: ${name}`);
        }
        return results;
    }

    // Поиск по ID
    @Get(':id')
    async getById(@Param('id') id: number): Promise<DataValue> {
        const result = await this.dataService.findById(id);
        if (!result) {
            throw new NotFoundException(`DataValue with ID ${id} not found`);
        }
        return result;
    }

}
