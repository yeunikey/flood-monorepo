"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const auth_module_1 = require("./auth/auth.module");
const catalog_entity_1 = require("./data/entities/catalog.entity");
const category_entity_1 = require("./data/entities/category.entity");
const data_module_1 = require("./data/data.module");
const data_source_entity_1 = require("./data/entities/data_source.entity");
const data_value_entity_1 = require("./data/entities/data_value.entity");
const file_entity_1 = require("./file/entities/file.entity");
const file_module_1 = require("./file/file.module");
const image_entity_1 = require("./image/entities/image.entity");
const image_module_1 = require("./image/image.module");
const layer_entity_1 = require("./layers/entities/layer.entity");
const layer_module_1 = require("./layers/layer.module");
const mail_module_1 = require("./mailer/mail.module");
const method_type_entity_1 = require("./data/entities/method_type.entity");
const common_1 = require("@nestjs/common");
const qcl_entity_1 = require("./data/entities/qcl.entity");
const site_1 = require("./data/entities/site");
const site_type_1 = require("./data/entities/site_type");
const typeorm_1 = require("@nestjs/typeorm");
const unit_entity_1 = require("./data/entities/unit.entity");
const user_entity_1 = require("./users/models/user.entity");
const user_module_1 = require("./users/user.module");
const variable_entity_1 = require("./data/entities/variable.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            mail_module_1.MailModule,
            auth_module_1.AuthModule,
            image_module_1.ImageModule,
            file_module_1.FileModule,
            layer_module_1.LayerModule,
            data_module_1.DataModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '1234',
                database: 'flood',
                entities: [
                    user_entity_1.User,
                    image_entity_1.Image,
                    site_1.Site,
                    site_type_1.SiteType,
                    file_entity_1.File,
                    layer_entity_1.Layer,
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
                ],
                synchronize: true,
                logging: true,
            }),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map