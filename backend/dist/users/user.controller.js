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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const auth_guard_1 = require("../auth/auth.guard");
const image_service_1 = require("../image/image.service");
const user_dto_1 = require("./dto/user.dto");
let UserController = class UserController {
    userService;
    imageService;
    constructor(userService, imageService) {
        this.userService = userService;
        this.imageService = imageService;
    }
    async get(params) {
        const user = await this.userService.findById(params.id);
        if (!user) {
            return {
                statusCode: 400,
                message: "Такой пользователь не найден"
            };
        }
        return {
            statusCode: 200,
            data: {
                ...user,
                password: undefined
            }
        };
    }
    async delete(req) {
        const user = await this.userService.findById(req.user.id);
        if (!user) {
            return {
                statusCode: 400,
                message: "Пользователь не найден"
            };
        }
        await this.userService.delete(user);
        return {
            statusCode: 200
        };
    }
    async update(req, body) {
        const user = await this.userService.findById(req.user.id);
        if (!user) {
            return {
                statusCode: 400,
                message: "Пользователь не найден"
            };
        }
        if (body.image) {
            if (user.image) {
                await this.imageService.delete(user.image);
            }
            user.image = body.image;
        }
        const saved = await this.userService.save(user);
        return {
            statusCode: 200,
            message: 'Профиль обновлён',
            data: {
                ...saved,
                password: undefined
            }
        };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('get/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "get", null);
__decorate([
    (0, common_1.Post)('delete'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('update'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserUpdateDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        image_service_1.ImageService])
], UserController);
//# sourceMappingURL=user.controller.js.map