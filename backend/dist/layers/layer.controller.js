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
exports.LayerController = void 0;
const common_1 = require("@nestjs/common");
const layer_service_1 = require("./layer.service");
const auth_guard_1 = require("../auth/auth.guard");
const layer_create_dto_1 = require("./dto/layer-create.dto");
const user_service_1 = require("../users/user.service");
let LayerController = class LayerController {
    layerService;
    userService;
    constructor(layerService, userService) {
        this.layerService = layerService;
        this.userService = userService;
    }
    async getMyLayers({ user: { id } }) {
        const user = await this.userService.findById(id);
        if (!user) {
            return {
                statusCode: 400,
                message: "Такого пользователя не существует"
            };
        }
        const layers = await this.layerService.findAllByUser(user);
        return {
            statusCode: 200,
            data: layers
        };
    }
    async create({ user: { id } }, body) {
        const user = await this.userService.findById(id);
        if (!user) {
            return {
                statusCode: 400,
                message: "Такого пользователя не существует"
            };
        }
        const obj = {
            name: body.name,
            file: body.file,
            user: user
        };
        const saved = await this.layerService.save(obj);
        return {
            statusCode: 201,
            message: "Слой успешно создан",
            data: saved
        };
    }
    async delete({ user: { id } }, layer_id) {
        const user = await this.userService.findById(id);
        if (!user) {
            return {
                statusCode: 400,
                message: "Такого пользователя не существует"
            };
        }
        const layer = await this.layerService.findById(Number(layer_id));
        if (!layer) {
            return {
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: 'Такого слоя больше не существует'
            };
        }
        await this.layerService.delete(layer);
        return {
            statusCode: 200
        };
    }
};
exports.LayerController = LayerController;
__decorate([
    (0, common_1.Get)('my'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LayerController.prototype, "getMyLayers", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, layer_create_dto_1.LayerCreateDto]),
    __metadata("design:returntype", Promise)
], LayerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('delete'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('layer_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, layer_create_dto_1.LayerCreateDto]),
    __metadata("design:returntype", Promise)
], LayerController.prototype, "delete", null);
exports.LayerController = LayerController = __decorate([
    (0, common_1.Controller)('layers'),
    __metadata("design:paramtypes", [layer_service_1.LayerService,
        user_service_1.UserService])
], LayerController);
//# sourceMappingURL=layer.controller.js.map