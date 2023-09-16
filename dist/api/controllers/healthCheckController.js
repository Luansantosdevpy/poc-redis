"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const healthCheckService_1 = __importDefault(require("../../application/services/healthCheckService"));
const logger_1 = __importDefault(require("../../infrastructure/log/logger"));
class HealthCheckController {
    async getStatusAPI(request, response) {
        logger_1.default.debug('healthCheckController - getStatusAPI - healthCheckService');
        const healthCheckService = tsyringe_1.container.resolve(healthCheckService_1.default);
        console.log('chegou aqui');
        const result = await healthCheckService.checkStatusAPI();
        response.status(200).json({ data: result });
    }
}
exports.default = HealthCheckController;
