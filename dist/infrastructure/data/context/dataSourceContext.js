"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _DataSourceContext_disconnect;
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../log/logger"));
const dataSourceConfig_1 = __importDefault(require("../config/dataSourceConfig"));
class DataSourceContext {
    constructor() {
        this.connect = async () => {
            logger_1.default.debug('Connecting to PostgreSQL server...');
            try {
                this.datasource = await dataSourceConfig_1.default.initialize();
                logger_1.default.debug(`Connected to database on ${this.constructor.name}!`);
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.debug('Error connecting to PostgreSQL server', {
                        error: error.message
                    });
                    throw error;
                }
            }
        };
        _DataSourceContext_disconnect.set(this, async () => {
            if (this.datasource) {
                await this.datasource.destroy();
                logger_1.default.debug('Closed connection to PostgreSQL server');
            }
            process.exit(1);
        });
        process.on('SIGINT', __classPrivateFieldGet(this, _DataSourceContext_disconnect, "f")).on('SIGTERM', __classPrivateFieldGet(this, _DataSourceContext_disconnect, "f"));
    }
    checkExistenceOfConnection() {
        return this.datasource !== null;
    }
}
_DataSourceContext_disconnect = new WeakMap();
exports.default = DataSourceContext;
