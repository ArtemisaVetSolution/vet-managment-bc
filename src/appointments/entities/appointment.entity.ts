import { AppointmentState } from "src/common/enums/appointment-state.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Service } from "src/services/entities/service.entity";
import { Collaborator } from "src/collaborators/entities/collaborator.entity";
import { Patient } from "src/patients/entities/patient.entity";
import { AuditableEntity } from "src/common/entities/auditable.entity";
import { MedicalHistoryRecord } from "src/medical-history-record/entities/medical-history-record.entity";
@Entity('appointments')
export class Appointment extends AuditableEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    date: Date;

    @Column({

    })
    time: string;

    @Column({
        name: 'total_price',
        default: 0
    })
    totalPrice: number;

    @Column({
        type: 'enum',
        enum: AppointmentState
    })
    state: AppointmentState;

    @ManyToOne(() => Service, (service) => service.appointments)
    @JoinColumn({ name: 'service_id' })
    service: Service;

    @ManyToOne(() => Patient, (patient) => patient.appointments)
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    @ManyToOne(() => Collaborator, (collaborator) => collaborator.appointments)
    @JoinColumn({ name: 'collaborator_id' })
    collaborator: Collaborator;

    @OneToOne(() => MedicalHistoryRecord, (medicalHistoryRecord) => medicalHistoryRecord.appointment)
    medicalHistoryRecord: MedicalHistoryRecord
}
