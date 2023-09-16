import { DependencyContainer, instanceCachingFactory } from 'tsyringe';
import Logger from './infrastructure/log/logger';
import DataSourceContext from './infrastructure/data/context/dataSourceContext';
import HealthCheckRepositoryInterface from './domain/interfaces/repositories/healthCheckRepositoryInterface';
import PostgresHealthCheckRepository from './infrastructure/data/repositories/postgresHealtCheckRepository';

const registerRepositories = async (
  container: DependencyContainer
): Promise<void> => {
  const databaseConnection = new DataSourceContext();
  await databaseConnection.connect();

  container.register<DataSourceContext>('DataSourceContext', {
    useFactory: instanceCachingFactory(() => databaseConnection)
  });

  container.registerInstance(
    'EntityManager',
    databaseConnection.datasource!.manager
  );

  container.register<HealthCheckRepositoryInterface>(
    'HealthCheckRepositoryInterface',
    {
      useClass: PostgresHealthCheckRepository
    }
  );
}
export default async (container: DependencyContainer): Promise<void> => {
  Logger.debug('Dependency container initializing...');
  
  Logger.debug('Dependency container initialized!');
};
