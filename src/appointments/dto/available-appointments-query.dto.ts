import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNumber } from "class-validator";

export class AvailableAppointmentsDto {
    @ApiProperty({ description: 'ID of the collaborator', example: 1})
    @IsNumber()
    collaboratorId: number;

    @ApiProperty({ description: 'Date to check availability', example: '2024-10-01'})
    @Transform(({ value }) => value ? new Date(value) : null)
    @IsDate()
    date: Date;
}