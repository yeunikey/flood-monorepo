"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const catalog_entity_1 = require("./entities/catalog.entity");
const category_entity_1 = require("./entities/category.entity");
const data_value_entity_1 = require("./entities/data_value.entity");
const method_type_entity_1 = require("./entities/method_type.entity");
const qcl_entity_1 = require("./entities/qcl.entity");
const unit_entity_1 = require("./entities/unit.entity");
const variable_entity_1 = require("./entities/variable.entity");
const data_source_entity_1 = require("./entities/data_source.entity");
const site_1 = require("./entities/site");
const site_type_1 = require("./entities/site_type");
let DataService = class DataService {
    dataValueRepo;
    categoryRepo;
    catalogRepo;
    siteRepo;
    siteTypeRepo;
    variableRepo;
    unitRepo;
    methodRepo;
    sourceRepo;
    qclRepo;
    constructor(dataValueRepo, categoryRepo, catalogRepo, siteRepo, siteTypeRepo, variableRepo, unitRepo, methodRepo, sourceRepo, qclRepo) {
        this.dataValueRepo = dataValueRepo;
        this.categoryRepo = categoryRepo;
        this.catalogRepo = catalogRepo;
        this.siteRepo = siteRepo;
        this.siteTypeRepo = siteTypeRepo;
        this.variableRepo = variableRepo;
        this.unitRepo = unitRepo;
        this.methodRepo = methodRepo;
        this.sourceRepo = sourceRepo;
        this.qclRepo = qclRepo;
    }
    async findCategoryById(id) {
        return this.categoryRepo.findOne({ where: { id } });
    }
    async getAllCategories() {
        return this.categoryRepo.find();
    }
    async createCategory(category) {
        return this.categoryRepo.save(category);
    }
    async getVariablesByCategory(categoryId) {
        const dataValues = await this.dataValueRepo.find({
            where: {
                category: { id: categoryId }
            },
        });
        const variablesMap = new Map();
        for (const dv of dataValues) {
            const variable = dv.catalog.variable;
            variablesMap.set(variable.id, variable);
        }
        return Array.from(variablesMap.values());
    }
    async findDataByCategoryId(id) {
        return this.dataValueRepo.find({
            where: { category: { id } },
        });
    }
    async findById(id) {
        return this.dataValueRepo.findOne({
            where: { id },
        });
    }
    async loadDataValues(data) {
        const results = [];
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
};
exports.DataService = DataService;
exports.DataService = DataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(data_value_entity_1.DataValue)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(2, (0, typeorm_1.InjectRepository)(catalog_entity_1.Catalog)),
    __param(3, (0, typeorm_1.InjectRepository)(site_1.Site)),
    __param(4, (0, typeorm_1.InjectRepository)(site_type_1.SiteType)),
    __param(5, (0, typeorm_1.InjectRepository)(variable_entity_1.Variable)),
    __param(6, (0, typeorm_1.InjectRepository)(unit_entity_1.Unit)),
    __param(7, (0, typeorm_1.InjectRepository)(method_type_entity_1.MethodType)),
    __param(8, (0, typeorm_1.InjectRepository)(data_source_entity_1.DataSource)),
    __param(9, (0, typeorm_1.InjectRepository)(qcl_entity_1.Qcl)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DataService);
//# sourceMappingURL=data.service.js.map