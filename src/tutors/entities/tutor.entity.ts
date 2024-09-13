import { AuditableEntity } from "src/common/entities/auditable.entity";
import { Patient } from "src/patients/entities/patient.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tutors')
export class Tutor extends AuditableEntity{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column({ name: 'identification_number'})
    identificationNumber: number;

    @Column({ name: 'user_id', type: 'uuid'})
    userId: string;

    @OneToMany(() => Patient, (patient) => patient.tutor)
    patients: Patient[];
}
