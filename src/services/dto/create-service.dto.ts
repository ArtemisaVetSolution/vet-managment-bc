import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Collaborator } from "src/collaborators/entities/collaborator.entity";


export class CreateServiceDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsArray()
  @IsOptional()
  collaborators: Collaborator[];
}
