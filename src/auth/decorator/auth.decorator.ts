/* eslint-disable prettier/prettier */
import { AuthType } from '../enums/auth-type-enum';
import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY } from '../constants/auth.constnts';

export const Auth = (...authType: AuthType[]) =>
  SetMetadata(AUTH_TYPE_KEY, authType);
