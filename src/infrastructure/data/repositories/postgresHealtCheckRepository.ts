import { inject, injectable } from 'tsyringe';
import { EntityManager } from 'typeorm';
import HealthCheckRepositoryInterface from '../../../domain/interfaces/repositories/healthCheckRepositoryInterface';
import Logger from '../../log/logger';

@injectable()
export default class PostgresHealthCheckRepository
  implements HealthCheckRepositoryInterface
{
  constructor(
    @inject('EntityManager')
    private readonly entityManager: EntityManager
  ) {}

  public async findStatus() {
    Logger.debug('healthCheckRepository - findStatus - entityManager');
    const res = await this.entityManager.query('SELECT 1 AS check');
    return res.length > 0 ? 'Ok' : 'ERROR';
  }
}
