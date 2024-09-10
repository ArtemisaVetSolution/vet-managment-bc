import { HttpService } from '@nestjs/axios';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class JwtValidationGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];   

    if (!token) {
      throw new HttpException('Token not provided', HttpStatus.UNAUTHORIZED);
    }

    try {
      // Convertir el Observable en una Promise usando lastValueFrom
      const response = await lastValueFrom(
        this.httpService.get('http://users-service:3001/api/auth/validate-jwt', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      
      return response.data.data.valid; // Devolver true si el token es válido

    } catch (error) {
      console.error('Error validating token:', error.message);
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
