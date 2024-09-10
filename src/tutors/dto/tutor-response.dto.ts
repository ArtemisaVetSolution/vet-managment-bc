import { ApiProperty } from "@nestjs/swagger";
import { CreatePatientDto } from "src/patients/dto/create-patient.dto";

export class TutorResponseDto {
    @ApiProperty({ example: 'John Doe'})
    name: string;

    @ApiProperty({ example: 123456})
    identificationNumber: number;

    @ApiProperty({ example: 2})
    userId: number;

    @ApiProperty()
    patients: CreatePatientDto
}