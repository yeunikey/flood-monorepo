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
exports.LayerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const layer_entity_1 = require("./entities/layer.entity");
const file_service_1 = require("../file/file.service");
let LayerService = class LayerService {
    layerRepository;
    fileService;
    constructor(layerRepository, fileService) {
        this.layerRepository = layerRepository;
        this.fileService = fileService;
    }
    async findAllByUser(user) {
        return await this.layerRepository.find({
            where: { user },
        });
    }
    async findById(id) {
        return await this.layerRepository.findOne({
            where: { id },
        });
    }
    async save(layer) {
        return await this.layerRepository.save(layer);
    }
    async delete(layer) {
        await this.fileService.delete(layer.file);
        return await this.layerRepository.remove(layer);
    }
};
exports.LayerService = LayerService;
exports.LayerService = LayerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(layer_entity_1.Layer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        file_service_1.FileService])
], LayerService);
//# sourceMappingURL=layer.service.js.map