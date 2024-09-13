import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Collaborator } from "src/collaborators/entities/collaborator.entity";


export class CreateServiceDto {

  @ApiProperty({ description: `Service name`, example: 'Medicina general'})
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: `Service price`, example: 9000 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

}
