import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class MedicalHistoryQueryDto {

    @ApiPropertyOptional({ example: 1})
    @IsOptional()
    @IsNumber()
    patientId?: number;

    @ApiPropertyOptional({ example: 1})
    @IsOptional()
    @IsNumber()
    appointmentId?: number;
}