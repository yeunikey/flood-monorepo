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
exports.DataValue = void 0;
const typeorm_1 = require("typeorm");
const catalog_entity_1 = require("./catalog.entity");
const category_entity_1 = require("./category.entity");
const qcl_entity_1 = require("./qcl.entity");
let DataValue = class DataValue {
    id;
    catalog;
    category;
    date_utc;
    value;
    qcl;
};
exports.DataValue = DataValue;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DataValue.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => catalog_entity_1.Catalog, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'catalog_id' }),
    __metadata("design:type", catalog_entity_1.Catalog)
], DataValue.prototype, "catalog", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", category_entity_1.Category)
], DataValue.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], DataValue.prototype, "date_utc", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true }),
    __metadata("design:type", Number)
], DataValue.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => qcl_entity_1.Qcl, { eager: true, nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'qcl' }),
    __metadata("design:type", qcl_entity_1.Qcl)
], DataValue.prototype, "qcl", void 0);
exports.DataValue = DataValue = __decorate([
    (0, typeorm_1.Entity)('data_value')
], DataValue);
//# sourceMappingURL=data_value.entity.js.map