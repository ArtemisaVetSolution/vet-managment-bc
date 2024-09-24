import { ApiProperty } from "@nestjs/swagger";
import { IMedicalHistoryRecord } from "../interfaces/medical-history.interface";
import { IsNotEmpty, IsNumber } from "class-validator";
import { IPatientState } from "../interfaces/patient-state.interface";

export class CreateMedicalHistoryRecordDto {
    @ApiProperty({ description: 'The content of the clinical evaluation', example: {
        previousIllnesses: 'Parvovirus',
        consultationReason: 'Consulta general',
        respiratoryRate: 20,
        heartRate: 100,
        pulse: 'Normal',
        CRT: 2,
        temperature: 38.5,
        limphaticNodes: 'No inflamados',
        mucosa: 'Rosadas',
        temperament: 'Tranquilo',
        findings: 'Sin anomalías',
        tests: 'Hematología completa'
    }})
    @IsNotEmpty()
    content: IMedicalHistoryRecord;

    @ApiProperty({description: 'current weight and alimentation', example: {
        weight: 3.8,
        alimentation: 'Hills',
        sterilized: true
    }})
    @IsNotEmpty()
    patientState: IPatientState;

    @ApiProperty({ description: 'ID of the patient', example: 1})
    @IsNumber()
    patientId: number;

    @ApiProperty({ description: 'ID of the appointment', example: 1})
    @IsNumber()
    appointmentId: number;
}
