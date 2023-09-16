"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const healthCheckController_1 = __importDefault(require("../../controllers/healthCheckController"));
exports.default = async () => {
    const router = (0, express_1.Router)();
    console.log('aqui');
    const healthController = tsyringe_1.container.resolve(healthCheckController_1.default);
    router.get('/', healthController.getStatusAPI);
    return router;
};
