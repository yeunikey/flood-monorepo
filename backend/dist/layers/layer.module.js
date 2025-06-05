"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayerModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const layer_service_1 = require("./layer.service");
const layer_controller_1 = require("./layer.controller");
const layer_entity_1 = require("./entities/layer.entity");
const user_module_1 = require("../users/user.module");
const file_module_1 = require("../file/file.module");
let LayerModule = class LayerModule {
};
exports.LayerModule = LayerModule;
exports.LayerModule = LayerModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([layer_entity_1.Layer]), user_module_1.UserModule, file_module_1.FileModule],
        providers: [layer_service_1.LayerService],
        controllers: [layer_controller_1.LayerController],
        exports: [layer_service_1.LayerService]
    })
], LayerModule);
//# sourceMappingURL=layer.module.js.map