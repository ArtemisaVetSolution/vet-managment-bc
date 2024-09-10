import { AppointmentState } from "src/common/enums/appointment-state.enum";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Patient } from "src/patients/entities/patient.entity";
import { Service } from "src/services/entities/service.entity";
import { Collaborator } from "src/collaborators/entities/collaborator.entity";
@Entity('appointments')
export class Appointment {
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

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`,
        select: false,
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamptz',
        onUpdate: `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`,
        select: false,
    })
    updatedAt: Date; 

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamptz',
        select: false,
    })
    deletedAt: Date;
}
