import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTestResultDto {

    @ApiProperty({ description: 'The date of the test', example: '2024-09-30'})
    @IsNotEmpty()
    @Transform(({ value }) => value ? new Date(value) : null)
    @IsDate()
    date: Date;

    @ApiProperty({ description: 'Id of the patient', example: 1})
    @IsNotEmpty()
    @IsNumber()
    patientId: number;

    @ApiProperty({ description: 'Id of the service', example: 1})
    @IsNotEmpty()
    @IsNumber()
    serviceId: number;

    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
}

