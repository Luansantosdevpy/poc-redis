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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const typeorm_1 = require("typeorm");
const logger_1 = __importDefault(require("../../log/logger"));
let PostgresHealthCheckRepository = class PostgresHealthCheckRepository {
    constructor(entityManager) {
        this.entityManager = entityManager;
    }
    async findStatus() {
        logger_1.default.debug('healthCheckRepository - findStatus - entityManager');
        const res = await this.entityManager.query('SELECT 1 AS check');
        return res.length > 0 ? 'Ok' : 'ERROR';
    }
};
PostgresHealthCheckRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('EntityManager')),
    __metadata("design:paramtypes", [typeorm_1.EntityManager])
], PostgresHealthCheckRepository);
exports.default = PostgresHealthCheckRepository;
