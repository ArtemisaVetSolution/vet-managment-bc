import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateCollaboratorDto extends CreateUserDto {

  @IsString()
  @IsNotEmpty()
  shiftName: string;

  @IsArray()
  servicesId: number[]

}
