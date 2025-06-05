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
exports.SiteController = void 0;
const common_1 = require("@nestjs/common");
const site_service_1 = require("./site.service");
const site_type_1 = require("../data/entities/site_type");
const auth_guard_1 = require("../auth/auth.guard");
let SiteController = class SiteController {
    siteService;
    constructor(siteService) {
        this.siteService = siteService;
    }
    async allSite() {
        return {
            statusCode: 200,
            data: await this.siteService.findAllSite()
        };
    }
    async allSiteFilterType(site_id) {
        return {
            statusCode: 200,
            data: await this.siteService.findAllSiteFilterType(site_id)
        };
    }
    async allSiteType() {
        return {
            statusCode: 200,
            data: await this.siteService.findAllSiteType()
        };
    }
    async createSiteType(body) {
        return {
            statusCode: 200,
            data: await this.siteService.saveSiteType(body)
        };
    }
    async createSite(body) {
        return {
            statusCode: 200,
            data: await this.siteService.saveSite(body)
        };
    }
    async upload(body) {
        return {
            statusCode: 200,
            data: await this.siteService.saveSites(body)
        };
    }
    async deleteSite(site_id) {
        await this.siteService.deleteSite(site_id);
        return {
            statusCode: 200,
        };
    }
};
exports.SiteController = SiteController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "allSite", null);
__decorate([
    (0, common_1.Get)('/filter'),
    __param(0, (0, common_1.Query)('site_type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "allSiteFilterType", null);
__decorate([
    (0, common_1.Get)('types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "allSiteType", null);
__decorate([
    (0, common_1.Post)('/types'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [site_type_1.SiteType]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "createSiteType", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "createSite", null);
__decorate([
    (0, common_1.Post)('/upload'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "upload", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)('site_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SiteController.prototype, "deleteSite", null);
exports.SiteController = SiteController = __decorate([
    (0, common_1.Controller)('sites'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [site_service_1.SiteService])
], SiteController);
//# sourceMappingURL=site.controller.js.map