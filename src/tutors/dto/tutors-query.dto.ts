import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsNumber } from "class-validator";

export class TutorQueryDto {
    @ApiPropertyOptional({ description: 'ID number of the tutor', example: 123456 })
    @IsOptional()
    idNumber?: number;

}
