import { Patient } from "src/patients/entities/patient.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tutors')
export class Tutor {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'identification_number'})
    identificationNumber: number;

    @Column({ name: 'user_id'})
    userId: number;

    @OneToMany(() => Patient, (patient) => patient.tutor)
    patients: Patient[]
}
