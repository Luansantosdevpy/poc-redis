"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const dotenv = __importStar(require("dotenv"));
const typeorm_1 = require("typeorm");
const path_1 = require("path");
dotenv.config();
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_POSTGRES_HOST,
    port: parseInt(process.env.DB_POSTGRES_PORT, 10),
    username: process.env.DB_POSTGRES_USER,
    password: process.env.DB_POSTGRES_PASSWORD,
    database: process.env.DB_POSTGRES_NAME,
    entities: [(0, path_1.join)(__dirname, `../../../domain/entities/*{.ts,.js}`)],
    migrations: [
        process.env.APP_ENVIRONMENT === 'test' ||
            process.env.APP_ENVIRONMENT === 'dev'
            ? `./dist/src/infrastructure/data/migrations/*.js`
            : `./src/infrastructure/data/migrations/*{.ts,.js}`
    ],
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy()
});
