import { AuthType } from '../enums/auth-type-enum';
import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPR_KEY } from '../constants/auth.constnts';

export const Auth = (...authType: AuthType[]) =>
  SetMetadata(AUTH_TYPR_KEY, authType);
