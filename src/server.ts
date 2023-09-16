import * as dotenv from 'dotenv';
import App from './app';

dotenv.config();

const api = new App();
const appName = 'sales-api';
const port = parseInt(process.env.APP_PORT ?? '3500', 10);

api.start(port, appName);
