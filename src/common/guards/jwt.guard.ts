import { CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

import { IHttpAdapter } from '../interfaces/http-adapter.interface';
import { userPath } from '../docs/users-service-path';
import { log } from 'console';

@Injectable()
export class JwtValidationGuard implements CanActivate {
  constructor(
    @Inject('IHttpAdapter') private readonly httpAdapter: IHttpAdapter
  
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];   

    if (!token) {
      throw new HttpException('Token not provided', HttpStatus.UNAUTHORIZED);
    }

    try {
      const decoder = jwt.decode(token)
      if(!decoder)
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
  
      const response = await this.httpAdapter.get<{ data: { valid: boolean } }>(
        `${userPath}/auth/validate-jwt`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      
      request.user = decoder;
      return response.data.valid;

    } catch (error) {
      console.error('Error validating token:', error.message);
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
