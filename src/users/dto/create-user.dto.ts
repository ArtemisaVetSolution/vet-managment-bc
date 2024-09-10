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
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/, {
    message: 'The password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;

  @IsString()
  @IsPhoneNumber(null)
  cellphone: string;

  @IsString()
  @IsOptional()
  rol: string;
}
