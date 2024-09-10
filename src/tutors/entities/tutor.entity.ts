import { Patient } from "src/patients/entities/patient.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tutors')
export class Tutor {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column({ name: 'identification_number'})
    identificationNumber: number;

    @Column({ name: 'user_id'})
    userId: number;

    @OneToMany(() => Patient, (patient) => patient.tutor)
    patients: Patient[];

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
