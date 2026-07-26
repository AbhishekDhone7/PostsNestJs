/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/auth-type-enum';
import { AUTH_TYPR_KEY } from 'src/auth/constants/auth.constnts';

@Injectable()
export class AuthenticationtGuard implements CanActivate {
  private static readonly deafultAuthType = AuthType.Bearer;

  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: {
      canActivate: () => true,
    },
  };
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authType = this.reflector.getAllAndOverride(AUTH_TYPR_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthenticationtGuard.deafultAuthType];

    console.log(authType);

    const guards = authType.map((type) => this.authTypeGuardMap[type]).flat();
    console.log(guards);

    const error = new UnauthorizedException();

    for (const instance of guards) {
      console.log('instance' , instance)
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((err) => {
        error: err;
      });
      console.log('canActivate', canActivate);
      if (canActivate) {
        return true;
      }
    }
    throw error;
  }
}
