"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const postgresHealtCheckRepository_1 = __importDefault(require("./infrastructure/data/repositories/postgresHealtCheckRepository"));
const logger_1 = __importDefault(require("./infrastructure/log/logger"));
const dataSourceContext_1 = __importDefault(require("./infrastructure/data/context/dataSourceContext"));
const registerRepositories = async (container) => {
    const databaseConnection = new dataSourceContext_1.default();
    await databaseConnection.connect();
    container.register('DataSourceContext', {
        useFactory: (0, tsyringe_1.instanceCachingFactory)(() => databaseConnection)
    });
    container.registerInstance('EntityManager', databaseConnection.datasource.manager);
    container.register('HealthCheckRepositoryInterface', {
        useClass: postgresHealtCheckRepository_1.default
    });
};
exports.default = async (container) => {
    logger_1.default.debug('Dependency container initializing...');
    await registerRepositories(container);
    logger_1.default.debug('Dependency container initialized!');
};
