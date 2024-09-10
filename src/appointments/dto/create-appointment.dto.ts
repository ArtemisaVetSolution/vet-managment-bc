import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsDate, IsNumber, IsMilitaryTime, IsString, IsNotEmpty } from "class-validator";

export class CreateAppointmentDto {

    @ApiProperty({ description: 'The appointments date', example: '2012-09-28', type: Date })
    @Transform(({ value }) => value ? new Date(value) : null)
    @IsDate()
    date: Date;

    @ApiProperty({ description: 'The time of the appointment', example: '12:00:00', type: String})
    @IsNotEmpty()
    time: string;

    @ApiProperty({ description: 'Service ID', example: 1, type: Number})
    @IsNumber()
    serviceId: number;

    @ApiProperty({ description: 'Patient ID', example: 1, type: Number})
    @IsNumber()
    patientId: number;

    @ApiProperty({ description: 'Collaborator ID', example: 1, type: Number})
    @IsNumber()
    collaboratorId: number;
}
