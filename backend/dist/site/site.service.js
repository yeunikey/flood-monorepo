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
exports.SiteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const site_1 = require("../data/entities/site");
const site_type_1 = require("../data/entities/site_type");
let SiteService = class SiteService {
    siteRepo;
    siteTypeRepo;
    constructor(siteRepo, siteTypeRepo) {
        this.siteRepo = siteRepo;
        this.siteTypeRepo = siteTypeRepo;
    }
    async findAllSite() {
        return await this.siteRepo.find({ relations: ['siteType'] });
    }
    async findAllSiteFilterType(site_type) {
        return await this.siteRepo.find({
            where: {
                siteType: {
                    id: site_type
                }
            },
        });
    }
    async findSiteById(id) {
        return await this.siteRepo.findOne({
            where: { id },
            relations: ['siteType'],
        });
    }
    async deleteSite(id) {
        return await this.siteRepo.delete(id);
    }
    async saveSite(data) {
        return await this.siteRepo.save(data);
    }
    async saveSites(data) {
        return await this.siteRepo.save(data);
    }
    async findAllSiteType() {
        return await this.siteTypeRepo.find();
    }
    async saveSiteType(data) {
        return await this.siteTypeRepo.save(data);
    }
};
exports.SiteService = SiteService;
exports.SiteService = SiteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(site_1.Site)),
    __param(1, (0, typeorm_1.InjectRepository)(site_type_1.SiteType)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SiteService);
//# sourceMappingURL=site.service.js.map