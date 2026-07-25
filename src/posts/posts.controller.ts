import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-post.dto';
import { ApiErrorResponseDto } from '../common/dtos/api-error-response.dto';
import { DeleteOperationResponseDto } from '../common/dtos/operation-response.dto';
import { PaginatedPostResponseDto } from './dtos/paginated-post-response.dto';
import { PostResponseDto } from './dtos/post-response.dto';

/** Public `/posts` controller. It delegates create, paginate, update, and delete operations to {@link PostsService}; no route guard is registered. */
@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  /** Creates the posts controller with the post application service. */
  constructor(
    /*
     *  Injecting Posts Service
     */
    private readonly postsService: PostsService,
  ) {}

  /*
   * GET localhost:3000/posts/:userId
   */
  /**
   * Returns a paginated collection of posts.
   *
   * @param userId Optional route user ID, currently unused as a filter.
   * @param postQuery Validated pagination and date criteria.
   * @returns A page of posts.
   */
  @Get('/:userId?')
  /**
   * Creates a post from validated input.
   *
   * @param createPostDto Validated post data.
   * @returns The persisted post.
   */
  @ApiOperation({
    summary: 'List blog posts',
    description:
      'Public endpoint. Returns paginated posts with eagerly loaded author, tag, and metadata relationships. The optional userId path value is accepted by the route but is not currently applied as a filter.',
  })
  @ApiParam({
    name: 'userId',
    required: false,
    description: 'Optional user identifier accepted by the route.',
    example: '1',
    type: String,
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
    description: 'Optional inclusive start of a publication-date filter.',
    example: '2024-01-01T00:00:00.000Z',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
    description: 'Optional inclusive end of a publication-date filter.',
    example: '2024-12-31T23:59:59.999Z',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Maximum number of records to return per page.',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'One-based page number to return.',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Paginated posts returned successfully.',
    type: PaginatedPostResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'One or more query parameters failed validation.',
    type: ApiErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'The server could not load posts.',
    type: ApiErrorResponseDto,
  })
  public getPosts(
    @Param('userId') userId: string,
    @Query() postQuery: GetPostsDto,
  ) {
    return this.postsService.findAll(postQuery, userId);
  }

  /**
   * Updates an existing post.
   *
   * @param patchPostDto Validated partial post data with a required ID.
   * @returns The updated post.
   */
  @ApiOperation({
    summary: 'Create a blog post',
    description:
      'Public endpoint. Validates the supplied author and tags, then creates a post with optional nested metadata.',
  })
  @ApiBody({ type: CreatePostDto })
  @ApiCreatedResponse({
    description: 'Post created successfully.',
    type: PostResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      'The request payload is invalid or references an invalid author or tag.',
    type: ApiErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'The server could not create the post.',
    type: ApiErrorResponseDto,
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  /**
   * Updates scalar post fields and replaces its tag collection.
   *
   * @param patchPostDto Validated partial post data with a required ID.
   * @returns The updated post.
   */
  @ApiOperation({
    summary: 'Update a blog post',
    description:
      'Public endpoint. Partially updates the specified post and replaces its tag association with the submitted tag identifiers.',
  })
  @ApiBody({ type: PatchPostDto })
  @ApiOkResponse({
    description: 'Post updated successfully.',
    type: PostResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      'The request payload is invalid, tags are invalid, or the post does not exist.',
    type: ApiErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'The server could not update the post.',
    type: ApiErrorResponseDto,
  })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.update(patchPostDto);
  }

  /**
   * Deletes an existing post.
   *
   * @param id Post identifier.
   * @returns A delete acknowledgement.
   */
  @Delete()
  @ApiOperation({
    summary: 'Delete a blog post',
    description:
      'Public endpoint. Deletes the post identified by the id query parameter and returns a deletion acknowledgement.',
  })
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
    description: 'Identifier of the post to delete.',
    example: 1,
  })
  @ApiOkResponse({
    description: 'Post deletion was requested successfully.',
    type: DeleteOperationResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The id query parameter must be an integer.',
    type: ApiErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'The server could not delete the post.',
    type: ApiErrorResponseDto,
  })
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
