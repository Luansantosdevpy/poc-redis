import 'reflect-metadata';
import { container } from 'tsyringe';
import express from 'express';
import dependencyContainer from './dependencyContainer';
import healthCheckRoute from './api/routes/v1/healthCheckRoute';
import Logger from './infrastructure/log/logger';

export default class App {
  public express: express.Application = express();

  public async start(port: number, appName: string): Promise<void> {
    await this.dependencyContainer();
    this.middlewares();
    await this.routes();

    this.express.listen(port, '0.0.0.0', async () => {
      Logger.info(`${appName} listening on port ${port}!`);
    });
  }

  private middlewares(): void {
    this.express.use(express.json());
  }

  private async dependencyContainer(): Promise<void> {
    await dependencyContainer(container);
  }

  private async routes(): Promise<void> {

    this.express.use(await healthCheckRoute());
  }
}
