import { In, Repository } from 'typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { Injectable } from '@nestjs/common';
import { Tag } from '../tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

/** Tag application service for persistence, resolving tag ID collections, and hard or soft deletion. */
@Injectable()
export class TagsService {
  /** Creates the tag service with its TypeORM repository dependency. */
  constructor(
    /**
     * Inject tagsRepository
     */
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  /**
   * Persists a new tag.
   *
   * @param createTagDto Validated tag values.
   * @returns The saved tag.
   */
  public async create(createTagDto: CreateTagDto) {
    let tag = this.tagsRepository.create(createTagDto);
    return await this.tagsRepository.save(tag);
  }

  /**
   * Resolves tags by identifier.
   *
   * @param tags Requested tag identifiers.
   * @returns Tags that match the supplied identifiers.
   */
  public async findMultipleTags(tags: number[]) {
    let results = await this.tagsRepository.find({
      where: {
        id: In(tags),
      },
    });

    return results;
  }

  /**
   * Permanently deletes a tag.
   *
   * @param id Tag identifier.
   * @returns A hard-delete acknowledgement.
   */
  public async delete(id: number) {
    await this.tagsRepository.delete(id);

    return {
      deleted: true,
      id,
    };
  }

  /**
   * Marks a tag as deleted without removing its row.
   *
   * @param id Tag identifier.
   * @returns A soft-delete acknowledgement.
   */
  public async softRemove(id: number) {
    await this.tagsRepository.softDelete(id);

    return {
      softDeleted: true,
      id,
    };
  }
}
