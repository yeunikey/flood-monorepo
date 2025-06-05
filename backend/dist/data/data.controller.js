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
exports.DataController = void 0;
const common_1 = require("@nestjs/common");
const data_service_1 = require("./data.service");
let DataController = class DataController {
    dataService;
    constructor(dataService) {
        this.dataService = dataService;
    }
    async loadData(data) {
        return {
            statusCode: 200,
            data: await this.dataService.loadDataValues(data)
        };
    }
    async getAllCategory() {
        return {
            statusCode: 200,
            data: await this.dataService.getAllCategories()
        };
    }
    async createCategory(body) {
        return {
            statusCode: 200,
            data: await this.dataService.createCategory(body)
        };
    }
    async categoryVariables(categoryId) {
        const category = await this.dataService.findCategoryById(categoryId);
        if (!category) {
            return {
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: "Категория не найдена"
            };
        }
        return {
            statusCode: 200,
            data: await this.dataService.getVariablesByCategory(categoryId)
        };
    }
    async getByCategory(id) {
        return {
            statusCode: 200,
            data: await this.dataService.findDataByCategoryId(id)
        };
    }
    async getById(id) {
        const result = await this.dataService.findById(id);
        if (!result) {
            return {
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: "Таких данных не существует"
            };
        }
        return result;
    }
};
exports.DataController = DataController;
__decorate([
    (0, common_1.Post)('upload'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], DataController.prototype, "loadData", null);
__decorate([
    (0, common_1.Get)('category'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DataController.prototype, "getAllCategory", null);
__decorate([
    (0, common_1.Post)('category'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DataController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)('category/:id/variables'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DataController.prototype, "categoryVariables", null);
__decorate([
    (0, common_1.Get)('category/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DataController.prototype, "getByCategory", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DataController.prototype, "getById", null);
exports.DataController = DataController = __decorate([
    (0, common_1.Controller)('data'),
    __metadata("design:paramtypes", [data_service_1.DataService])
], DataController);
//# sourceMappingURL=data.controller.js.map