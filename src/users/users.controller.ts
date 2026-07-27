import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiMovedPermanentlyResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { ApiErrorResponseDto } from '../common/dtos/api-error-response.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type-enum';

/** Public user-management controller for the `/users` domain. Endpoint decorators define validation and documented HTTP responses; no authorization guard is currently applied. */
@Controller('users')
@ApiTags('Users')
// @UseGuards(AccessTokenGuard) //! for make entire controler use Gurds
export class UsersController {
  constructor(
    // Injecting Users Service
    private readonly usersService: UsersService,
  ) {}

  /**
   * Handles the current moved users-list route.
   *
   * @param getUserParamDto Optional route identifier.
   * @param limit Requested page size.
   * @param page Requested one-based page number.
   * @returns The service response, currently a moved-permanently exception.
   */
  @Get('/:id?')
  @ApiOperation({
    summary: 'List registered users',
    description:
      'Public endpoint. The current implementation responds with 301 because the user-listing service is intentionally marked as moved; this operation documents the existing runtime behavior.',
  })
  @ApiMovedPermanentlyResponse({
    description:
      'The current user-listing implementation reports that this endpoint has moved.',
    type: ApiErrorResponseDto,
  })
  @ApiParam({
    name: 'id',
    required: false,
    description: 'Optional user identifier accepted by the route.',
    example: 1,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Maximum number of entries requested per page.',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description:
      'The position of the page number that you want the API to return',
    example: 1,
  })
  public getUsers(
    @Param() getUserParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(getUserParamDto, limit, page);
  }

  /**
   * Creates one account after validation and password hashing.
   *
   * @param createUserDto Validated account details.
   * @returns The persisted user entity.
   */
  @Post()
  // @SetMetadata('authType', 'none') //! remove guard
  @Auth(AuthType.None)
  @ApiOperation({
    summary: 'Create a user',
    description:
      'Public endpoint. Creates a user after validating the payload and hashing its password.',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'User created successfully.',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description:
      'The request payload is invalid or its email is already registered.',
    type: ApiErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'The server could not persist the user.',
    type: ApiErrorResponseDto,
  })
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  /**
   * Creates all submitted accounts in one transaction.
   *
   * @param createManyUsersDto Validated user collection.
   * @returns Persisted users when the transaction commits.
   */
  @UseGuards(AccessTokenGuard)
  @Post('create-many')
  @ApiOperation({
    summary: 'Create multiple users',
    description:
      'Public endpoint. Creates all submitted users in a single database transaction.',
  })
  @ApiBody({ type: CreateManyUsersDto })
  @ApiCreatedResponse({
    description: 'Multiple users created successfully.',
    type: UserResponseDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description: 'The request payload failed validation.',
    type: ApiErrorResponseDto,
  })
  @ApiConflictResponse({
    description: 'The user creation transaction could not be completed.',
    type: ApiErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'The server could not complete the transaction.',
    type: ApiErrorResponseDto,
  })
  public createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
    return this.usersService.createMany(createManyUsersDto);
  }

  /**
   * Validates a partial user payload without persisting it.
   *
   * @param patchUserDto Validated patch data.
   * @returns The submitted patch payload.
   */
  @Patch()
  @ApiOperation({
    summary: 'Preview a partial user update',
    description:
      'Public endpoint. The current implementation validates and echoes the submitted patch payload; it does not persist changes.',
  })
  @ApiBody({ type: PatchUserDto })
  @ApiOkResponse({
    description:
      'Validated patch payload returned by the current implementation.',
    type: PatchUserDto,
  })
  @ApiBadRequestResponse({
    description: 'The patch payload failed validation.',
    type: ApiErrorResponseDto,
  })
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
