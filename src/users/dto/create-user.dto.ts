import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsEmail,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Matches,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class CreateUserDto {

    @ApiProperty({ description: 'Email of the new user', example: 'user@email.com'})
    @IsEmail()
    email: string;
  
    @ApiProperty({ description: 'Name of the user', example: 'John Doe'})
    @IsString()
    @MinLength(2)
    name: string;
  
    @ApiProperty({ description: 'Password must have a Uppercase, lowercase letter and a number', example: 'MyPassword.123'})
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/, {
      message:
        'password The password must have a Uppercase, lowercase letter and a number',
    })
    password: string;
  
    @ApiProperty({ description: 'Cellphone of the user', example: '+57 3003965473'})
    @IsString()
    @IsPhoneNumber(null, {
      message: 'cellphone The cellphone number must be a valid phone number',
    })
    cellphone: string;
  
    @ApiPropertyOptional({ description: 'Role of the user', example: 'Tutor'})
    @IsString()
    @IsOptional()
    rol?: string;
  }
