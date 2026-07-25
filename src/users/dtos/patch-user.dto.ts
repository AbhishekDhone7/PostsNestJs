import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/swagger';

/** Partial user payload accepted by the non-persisting update-preview route. */
export class PatchUserDto extends PartialType(CreateUserDto) {}
