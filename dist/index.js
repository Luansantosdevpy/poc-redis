"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataSource_1 = require("./infrastructure/data/config/dataSource");
dataSource_1.AppDataSourse.initialize().then(async () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    return app.listen(process.env.PORT, function () {
        console.log(`listening on port ${process.env.PORT}!`);
    });
});
