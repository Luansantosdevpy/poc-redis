import { DataSource } from 'typeorm';
import Logger from '../../log/logger';
import dataSourceConfig from '../config/dataSourceConfig';

export default class DataSourceContext {
  constructor() {
    process.on('SIGINT', this.#disconnect).on('SIGTERM', this.#disconnect);
  }

  datasource?: DataSource;

  checkExistenceOfConnection(): boolean {
    return this.datasource !== null;
  }

  connect = async (): Promise<void> => {
    Logger.debug('Connecting to PostgreSQL server...');

    try {
      this.datasource = await dataSourceConfig.initialize();
      Logger.debug(`Connected to database on ${this.constructor.name}!`);
    } catch (error) {
      if (error instanceof Error) {
        Logger.debug('Error connecting to PostgreSQL server', {
          error: error.message
        });

        throw error;
      }
    }
  };

  #disconnect = async (): Promise<void> => {
    if (this.datasource) {
      await this.datasource.destroy();

      Logger.debug('Closed connection to PostgreSQL server');
    }

    process.exit(1);
  };
}
