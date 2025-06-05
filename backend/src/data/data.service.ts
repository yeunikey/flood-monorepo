import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Catalog } from './entities/catalog.entity';
import { Category } from './entities/category.entity';
import { DataValue } from './entities/data_value.entity';
import { MethodType } from './entities/method_type.entity';
import { Qcl } from './entities/qcl.entity';
import { Unit } from './entities/unit.entity';
import { Variable } from './entities/variable.entity';
import { DataSource } from './entities/data_source.entity';
import { Site } from './entities/site';
import { SiteType } from './entities/site_type';

@Injectable()
export class DataService {

    constructor(
        @InjectRepository(DataValue)
        private dataValueRepo: Repository<DataValue>,

        @InjectRepository(Category)
        private categoryRepo: Repository<Category>,

        @InjectRepository(Catalog)
        private catalogRepo: Repository<Catalog>,

        @InjectRepository(Site)
        private siteRepo: Repository<Site>,

        @InjectRepository(SiteType)
        private siteTypeRepo: Repository<SiteType>,

        @InjectRepository(Variable)
        private variableRepo: Repository<Variable>,

        @InjectRepository(Unit)
        private unitRepo: Repository<Unit>,

        @InjectRepository(MethodType)
        private methodRepo: Repository<MethodType>,

        @InjectRepository(DataSource)
        private sourceRepo: Repository<DataSource>,

        @InjectRepository(Qcl)
        private qclRepo: Repository<Qcl>,
    ) { }

    async findCategoryById(id: number) {
        return this.categoryRepo.findOne({ where: { id } })
    }

    async getAllCategories() {
        return this.categoryRepo.find();
    }

    async createCategory(category: DeepPartial<Category>) {
        return this.categoryRepo.save(category);
    }

    async getVariablesByCategory(categoryId: number): Promise<Variable[]> {
        const dataValues = await this.dataValueRepo.find({
            where: {
                category: { id: categoryId }
            },
        });

        const variablesMap = new Map<number, Variable>();

        for (const dv of dataValues) {
            const variable = dv.catalog.variable;
            variablesMap.set(variable.id, variable); // уникальность по id
        }

        return Array.from(variablesMap.values());
    }

    // Поиск DataValue по category name
    async findDataByCategoryId(id: number): Promise<DataValue[]> {
        return this.dataValueRepo.find({
            where: { category: { id } },
        });
    }

    // Поиск DataValue по id
    async findById(id: number): Promise<DataValue | null> {
        return this.dataValueRepo.findOne({
            where: { id },
        });
    }

    async loadDataValues(data: DataValue[]): Promise<DataValue[]> {
        const results: DataValue[] = [];

        for (const item of data) {

            const qcl = await this.qclRepo.findOne({ where: { name: item.qcl.name } }) ??
                await this.qclRepo.save(item.qcl);

            const category = await this.categoryRepo.findOne({ where: { name: item.category.name } }) ??
                await this.categoryRepo.save(item.category);

            const unit = await this.unitRepo.findOne({ where: { name: item.catalog.variable.unit.name } }) ??
                await this.unitRepo.save(item.catalog.variable.unit);

            const variable = await this.variableRepo.findOne({ where: { name: item.catalog.variable.name } }) ??
                await this.variableRepo.save({
                    name: item.catalog.variable.name,
                    description: item.catalog.variable.description,
                    unit: unit
                });

            const method = await this.methodRepo.findOne({ where: { name: item.catalog.method.name } }) ??
                await this.methodRepo.save(item.catalog.method);

            const source = await this.sourceRepo.findOne({ where: { name: item.catalog.source.name } }) ??
                await this.sourceRepo.save(item.catalog.source);

            const siteType = await this.siteTypeRepo.findOne({ where: { name: item.catalog.site.siteType.name } }) ??
                await this.siteTypeRepo.save(item.catalog.site.siteType);

            const site = await this.siteRepo.findOne({ where: { code: item.catalog.site.code } }) ??
                await this.siteRepo.save({
                    ...item.catalog.site,
                    siteType
                });

            const catalog = await this.catalogRepo.save({ site, variable, method, source });

            results.push(await this.dataValueRepo.save({
                catalog,
                category,
                date_utc: item.date_utc,
                value: item.value,
                qcl
            }));
        }

        return results;
    }
}
