import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsOptional } from "class-validator";

export class AppointmentsQueryDto {

    @ApiPropertyOptional({ description: 'The patient id to filter appointments', example: 1})
    @IsOptional()
    @IsNumber()
    patientId: number;

    @ApiPropertyOptional({ description: 'The service id to filter appointments', example: 1})
    @IsOptional()
    @IsNumber()
    serviceId: number;

    @ApiPropertyOptional({ description: 'The date to filter appointments', example: '2024-12-05'})
    @IsOptional()
    @Transform(({ value }) => value ? new Date(value) : null) // Transform string to Date
    @IsDate()
    date: Date;

}