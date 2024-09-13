import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { JwtPayload } from '../interfaces';
import { Leave, Path } from 'src/common/enums';


interface CustomRequest extends Request {
    user?: JwtPayload;
  }

@Injectable()
export class LeavesGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredPermission = this.reflector.get<Leave>('permissions', context.getHandler());
    
    const requiredPath = this.reflector.get<Path>('pathname', context.getClass());

    if(!requiredPermission || !requiredPath)
      return true

    const request = context.switchToHttp().getRequest<CustomRequest>();
    const user = request.user as JwtPayload;
    
    if(!user)
      throw new ForbiddenException('User not found');

    const userPermissions = user.permisions;
    
    const permissionsByPath = userPermissions.find(permission => permission.path === requiredPath)
    
    const permissionFound = permissionsByPath[requiredPermission]

    if (!permissionFound)
      throw new UnauthorizedException("You don't have permissions required to this path")
    
    return true

  }
}
