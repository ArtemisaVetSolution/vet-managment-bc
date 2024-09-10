import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsNotEmpty, MinDate } from "class-validator";

const currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 1)

export class CreateAppointmentDto {

    @ApiProperty({ description: 'The appointments date', example: '2024-09-28', type: Date })
    @Transform(({ value }) => value ? new Date(value) : null)
    @IsDate()
    @MinDate(currentDate)
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
