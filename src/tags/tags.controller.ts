import {
  Body,
  Controller,
  Delete,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagsService } from './providers/tags.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApiErrorResponseDto } from '../common/dtos/api-error-response.dto';
import {
  DeleteOperationResponseDto,
  SoftDeleteOperationResponseDto,
} from '../common/dtos/operation-response.dto';
import { TagResponseDto } from './dtos/tag-response.dto';

/** Public tag controller for create, hard-delete, and soft-delete operations under `/tags`. */
@Controller('tags')
@ApiTags('Tags')
export class TagsController {
  /** Creates the tag controller with the tag application service. */
  constructor(
    /**
     * Inject  tagsService
     */
    private readonly tagsService: TagsService,
  ) {}
  /**
   * Creates a tag from validated input.
   *
   * @param createTagDto Validated tag data.
   * @returns The persisted tag.
   */
  @ApiOperation({
    summary: 'Create a tag',
    description:
      'Public endpoint. Creates a tag that can be associated with blog posts.',
  })
  @ApiBody({ type: CreateTagDto })
  @ApiCreatedResponse({
    description: 'Tag created successfully.',
    type: TagResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The tag payload failed validation.',
    type: ApiErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'The server could not create the tag.',
    type: ApiErrorResponseDto,
  })
  @Post()
  public create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  /**
   * Permanently deletes the requested tag.
   *
   * @param id Tag identifier.
   * @returns A hard-delete acknowledgement.
   */
  @ApiOperation({
    summary: 'Permanently delete a tag',
    description:
      'Public endpoint. Permanently deletes the tag identified by the id query parameter.',
  })
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
    description: 'Identifier of the tag to delete.',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Tag deletion was requested successfully.',
    type: DeleteOperationResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The id query parameter must be an integer.',
    type: ApiErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'The server could not delete the tag.',
    type: ApiErrorResponseDto,
  })
  @Delete()
  public delete(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.delete(id);
  }

  /**
   * Soft-deletes the requested tag.
   *
   * @param id Tag identifier.
   * @returns A soft-delete acknowledgement.
   */
  @ApiOperation({
    summary: 'Soft-delete a tag',
    description:
      'Public endpoint. Marks the tag identified by the id query parameter as deleted without removing the database record.',
  })
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
    description: 'Identifier of the tag to soft-delete.',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Tag soft-deletion was requested successfully.',
    type: SoftDeleteOperationResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The id query parameter must be an integer.',
    type: ApiErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'The server could not soft-delete the tag.',
    type: ApiErrorResponseDto,
  })
  @Delete('soft-delete')
  public softDelete(@Query('id', ParseIntPipe) id: number) {
    return this.tagsService.softRemove(id);
  }
}
