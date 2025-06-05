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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Catalog = void 0;
const typeorm_1 = require("typeorm");
const data_source_entity_1 = require("./data_source.entity");
const method_type_entity_1 = require("./method_type.entity");
const site_1 = require("./site");
const variable_entity_1 = require("./variable.entity");
let Catalog = class Catalog {
    id;
    site;
    variable;
    method;
    source;
};
exports.Catalog = Catalog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Catalog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => site_1.Site, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'site_id' }),
    __metadata("design:type", site_1.Site)
], Catalog.prototype, "site", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => variable_entity_1.Variable, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'variable_id' }),
    __metadata("design:type", variable_entity_1.Variable)
], Catalog.prototype, "variable", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => method_type_entity_1.MethodType, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'method_id' }),
    __metadata("design:type", method_type_entity_1.MethodType)
], Catalog.prototype, "method", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => data_source_entity_1.DataSource, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'source_id' }),
    __metadata("design:type", data_source_entity_1.DataSource)
], Catalog.prototype, "source", void 0);
exports.Catalog = Catalog = __decorate([
    (0, typeorm_1.Entity)('catalog')
], Catalog);
//# sourceMappingURL=catalog.entity.js.map