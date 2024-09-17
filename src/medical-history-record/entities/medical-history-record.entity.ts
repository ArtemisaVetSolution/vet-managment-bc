import { Appointment } from "src/appointments/entities/appointment.entity";
import { AuditableEntity } from "src/common/entities/auditable.entity";
import { Patient } from "src/patients/entities/patient.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IPatientState } from '../interfaces/patient-state.interface.js';
import { IMedicalHistoryRecord } from "../interfaces/medical-history.interface.js";

@Entity('medical_history_record')
export class MedicalHistoryRecord extends AuditableEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'jsonb'
    })
    content: IMedicalHistoryRecord;

    @Column({
        type: 'jsonb'
    })
    patientState: IPatientState;

    @ManyToOne(() => Patient, (patient) => patient.medicalHistoryRecords)
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    @OneToOne(() => Appointment, (appointment) => appointment.medicalHistoryRecord)
    @JoinColumn({ name: 'appointment_id' })
    appointment: Appointment;
}
