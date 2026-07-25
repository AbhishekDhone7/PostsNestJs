import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';

import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { DataSource } from 'typeorm';
import { User } from '../user.entity';

/** Persists a batch of user DTOs in a single TypeORM transaction. A failure rolls back the entire batch. */
@Injectable()
export class UsersCreateManyProvider {
  /** Creates the transactional batch provider with the application data source. */
  constructor(
    /**
     * Inject the datasource
     */
    private dataSource: DataSource,
  ) {}

  /**
   * Creates users using an explicitly managed TypeORM transaction.
   *
   * @param createManyUsersDto Validated user collection.
   * @returns Saved user records.
   * @throws {ConflictException} When a write fails and the transaction rolls back.
   * @throws {RequestTimeoutException} When the query runner cannot connect or release.
   */
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    let newUsers: User[] = [];

    // Create Query Runner Instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // Connect the query ryunner to the datasource
      await queryRunner.connect();
      // Start the transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('Could not connect to the database');
    }

    try {
      for (let user of createManyUsersDto.users) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transaction', {
        description: String(error),
      });
    } finally {
      try {
        // you need to release a queryRunner which was manually instantiated
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException(
          'Could not release the query runner connection',
        );
      }
    }

    return newUsers;
  }
}
