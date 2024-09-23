import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional } from "class-validator";
import { AppointmentState } from "src/common/enums";

export class AppointmentsQueryDto {

    @ApiPropertyOptional({ description: 'The patient id to filter appointments', example: 1 })
    @IsOptional()
    @IsNumber()
    patientId: number;

    @ApiPropertyOptional({ description: 'The service id to filter appointments', example: 1 })
    @IsOptional()
    @IsNumber()
    serviceId: number;

    @ApiPropertyOptional({ description: 'The date to filter appointments', example: '2024-12-05' })
    @IsOptional()
    @Transform(({ value }) => value ? new Date(value) : null) // Transform string to Date
    @IsDate()
    date: Date;

    @ApiPropertyOptional({ description: 'The tutor id filter appointments', example: 1 })
    @IsOptional()
    @IsNumber()
    tutorId: number;

    @ApiPropertyOptional({ description: 'The tutor identification number', example: 123456})
    @IsOptional()
    @IsNumber()
    tutorIdentification: number;

    @ApiPropertyOptional({ description: 'Collaborator ID', example: 1 })
    @IsOptional()
    @IsNumber()
    collaboratorId: number;

    @ApiPropertyOptional({ description: 'The name of the state', example: 'Pendiente'})
    @IsOptional()
    @IsEnum(AppointmentState)
    state: AppointmentState;
}