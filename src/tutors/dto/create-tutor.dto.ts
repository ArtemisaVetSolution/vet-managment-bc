import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateTutorDto extends CreateUserDto{

    @ApiProperty({description: 'Citizenship ID number of the user', example: 123456})
    @IsNumber()
    identificationNumber: number;
}
