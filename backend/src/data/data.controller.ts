import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    HttpStatus,
} from '@nestjs/common';

import { DataService } from './data.service';
import { DataValue } from './entities/data_value.entity';

@Controller('data')
export class DataController {
    constructor(private readonly dataService: DataService) { }


    // load datavalue 
    @Post('upload')
    async loadData(@Body() data: DataValue[]) {
        return {
            statusCode: 200,
            data: await this.dataService.loadDataValues(data)
        };
    }

    // category

    @Get('category')
    async getAllCategory() {
        return {
            statusCode: 200,
            data: await this.dataService.getAllCategories()
        }
    }

    @Post('category')
    async createCategory(@Body() body: { name: string, description: string }) {
        return {
            statusCode: 200,
            data: await this.dataService.createCategory(body)
        }
    }

    @Get('category/:id/variables')
    async categoryVariables(@Param('id') categoryId: number) {

        const category = await this.dataService.findCategoryById(categoryId);

        if (!category) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Категория не найдена"
            }
        }

        return {
            statusCode: 200,
            data: await this.dataService.getVariablesByCategory(categoryId)
        }
    }

    // datavalue

    @Get('category/:id')
    async getByCategory(@Param('id') id: number) {
        return {
            statusCode: 200,
            data: await this.dataService.findDataByCategoryId(id)
        };
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        const result = await this.dataService.findById(id);
        if (!result) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "Таких данных не существует"
            }
        }
        return result;
    }

}
