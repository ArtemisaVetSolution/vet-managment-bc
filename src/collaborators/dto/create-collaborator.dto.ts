import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateCollaboratorDto extends CreateUserDto {

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  shiftId: number;

  @IsArray()
  servicesId: number[]

}
