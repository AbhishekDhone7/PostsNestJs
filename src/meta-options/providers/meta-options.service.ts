import { CreatePostMetaOptionsDto } from '../dtos/create-post-meta-options.dto';
import { Injectable } from '@nestjs/common';
import { MetaOption } from '../meta-option.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

/** Metadata-option application service that creates and saves JSON metadata records. */
@Injectable()
export class MetaOptionsService {
  /** Creates the metadata service with its TypeORM repository dependency. */
  constructor(
    /**
     * Injecting metaOptions repository
     */
    @InjectRepository(MetaOption)
    private metaOptionsRepository: Repository<MetaOption>,
  ) {}

  /**
   * Creates and persists a metadata JSON record.
   *
   * @param createPostMetaOptionsDto Validated metadata JSON.
   * @returns The saved metadata option.
   */
  public async create(createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
    let metaOption = this.metaOptionsRepository.create(
      createPostMetaOptionsDto,
    );
    return await this.metaOptionsRepository.save(metaOption);
  }
}
