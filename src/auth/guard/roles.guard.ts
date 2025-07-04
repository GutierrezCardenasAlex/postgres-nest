import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean{

    const role = this.reflector.getAllAndOverride(ROLES_KEY,[
      context.getHandler(),
      context.getClass()
    ]);

    if(!role){
      return true;
    }

    const {user}= context.switchToHttp().getRequest();

    if(user.role === Role.ADMIN){
      return true;
    }

    return role === user.role;
  }
}
