"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const healthCheck_1 = __importDefault(require("./healthCheck"));
const express_1 = require("express");
exports.default = async () => {
    const router = (0, express_1.Router)();
    router.use('/v1', router);
    router.use('/health-check', await (0, healthCheck_1.default)());
    return router;
};
