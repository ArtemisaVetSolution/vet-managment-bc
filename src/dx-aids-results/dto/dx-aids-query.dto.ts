import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsOptional } from "class-validator";

export class DxAidsQueryDto {
    @ApiPropertyOptional({ description: 'Patient ID', example: 1})
    @IsOptional()
    @IsNumber()
    patientId: number;

    @ApiPropertyOptional({description: 'Service ID', example: 2})
    @IsOptional()
    @IsNumber()
    serviceId: number;

    @ApiPropertyOptional({description: 'Date of the test', example: '2024-09-01'})
    @IsOptional()
    @Transform(({ value }) => value ? new Date(value) : null)
    @IsDate()
    date: Date;    
}