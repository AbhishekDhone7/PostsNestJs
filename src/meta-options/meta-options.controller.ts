import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options.dto';
import { MetaOptionsService } from './providers/meta-options.service';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiErrorResponseDto } from '../common/dtos/api-error-response.dto';
import { MetaOptionResponseDto } from './dtos/meta-option-response.dto';

/** Public `/meta-options` controller for persisting metadata JSON independently of a post. */
@Controller('meta-options')
@ApiTags('Meta options')
export class MetaOptionsController {
  constructor(
    /**
     * Inject MetaOptionsService
     * */
    private readonly MetaOptionsService: MetaOptionsService,
  ) {}

  /**
   * Persists a standalone metadata JSON record.
   *
   * @param createPostMetaOptionsDto Validated JSON metadata.
   * @returns The persisted metadata option.
   */
  @Post()
  @ApiOperation({
    summary: 'Create post metadata',
    description:
      'Public endpoint. Persists an independent metadata record containing a JSON string.',
  })
  @ApiBody({ type: CreatePostMetaOptionsDto })
  @ApiCreatedResponse({
    description: 'Metadata record created successfully.',
    type: MetaOptionResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The metadata payload failed validation.',
    type: ApiErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'The server could not create the metadata record.',
    type: ApiErrorResponseDto,
  })
  public async create(
    @Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto,
  ) {
    return this.MetaOptionsService.create(createPostMetaOptionsDto);
  }
}
