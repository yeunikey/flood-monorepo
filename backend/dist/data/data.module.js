"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataModule = void 0;
const catalog_entity_1 = require("./entities/catalog.entity");
const category_entity_1 = require("./entities/category.entity");
const data_controller_1 = require("./data.controller");
const data_service_1 = require("./data.service");
const data_source_entity_1 = require("./entities/data_source.entity");
const data_value_entity_1 = require("./entities/data_value.entity");
const method_type_entity_1 = require("./entities/method_type.entity");
const common_1 = require("@nestjs/common");
const qcl_entity_1 = require("./entities/qcl.entity");
const site_1 = require("./entities/site");
const site_type_1 = require("./entities/site_type");
const typeorm_1 = require("@nestjs/typeorm");
const unit_entity_1 = require("./entities/unit.entity");
const variable_entity_1 = require("./entities/variable.entity");
let DataModule = class DataModule {
};
exports.DataModule = DataModule;
exports.DataModule = DataModule = __decorate([
    (0, common_1.Module)({
        controllers: [data_controller_1.DataController],
        providers: [data_service_1.DataService],
        imports: [typeorm_1.TypeOrmModule.forFeature([
                catalog_entity_1.Catalog,
                category_entity_1.Category,
                data_source_entity_1.DataSource,
                data_value_entity_1.DataValue,
                method_type_entity_1.MethodType,
                qcl_entity_1.Qcl,
                site_type_1.SiteType,
                site_1.Site,
                unit_entity_1.Unit,
                variable_entity_1.Variable
            ])],
    })
], DataModule);
//# sourceMappingURL=data.module.js.map