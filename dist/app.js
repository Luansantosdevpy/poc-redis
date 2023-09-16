"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const routes_1 = __importDefault(require("./api/routes/routes"));
const dependencyContainer_1 = __importDefault(require("./dependencyContainer"));
const logger_1 = __importDefault(require("./infrastructure/log/logger"));
class App {
    constructor() {
        this.express = (0, express_1.default)();
        this.initialize = async () => {
            await this.dependencyContainer();
            await this.middlewares();
            await this.routes();
        };
        this.start = (port, appName) => {
            this.server = this.express.listen(port, '0.0.0.0', () => {
                logger_1.default.info(`${appName} listening on port ${port}!`);
            });
        };
        this.stop = () => {
            this.server.close();
        };
        this.middlewares = async () => {
            this.express.use(express_1.default.json());
            this.express.use((0, cors_1.default)({
                origin: '*',
                methods: 'POST, GET, PUT, OPTIONS, PATCH, DELETE'
            }));
            this.express.use((0, cors_1.default)());
        };
        this.dependencyContainer = async () => {
            await (0, dependencyContainer_1.default)(tsyringe_1.container);
        };
        this.routes = async () => {
            this.express.use(await (0, routes_1.default)());
        };
    }
}
exports.default = App;
