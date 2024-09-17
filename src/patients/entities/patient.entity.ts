import { Appointment } from "src/appointments/entities/appointment.entity";
import { AuditableEntity } from "src/common/entities/auditable.entity";
import { Gender } from "src/common/enums/gender.enum";
import { Species } from "src/common/enums/species.enum";
import { MedicalHistoryRecord } from "src/medical-history-record/entities/medical-history-record.entity";
import { TestResult } from "src/tests-results/entities/test-result.entity";
import { Tutor } from "src/tutors/entities/tutor.entity";

import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('patients')
export class Patient extends AuditableEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: Species
    })
    specie: Species;

    @Column()
    breed: string;

    @Column({
        type: 'enum',
        enum: Gender
    })
    gender: Gender;

    @Column({
        nullable: true,
        name: 'date_of_birth'
    })
    dob: Date;

    @Column({
        type: 'float'
    })
    weight: number;

    @Column()
    alimentation: string;

    @Column({ nullable: true})
    sterilized: boolean;

    @Column({ nullable: true})
    color: string;

    @ManyToOne(() => Tutor, (tutor) => tutor.patients)
    @JoinColumn({ name: 'tutor_id' })
    tutor: Tutor;

    @OneToMany(() => Appointment, (appointment) => appointment.patient)
    appointments: Appointment[];

    @OneToMany(() => TestResult, (testResult) => testResult.patient)
    testsResults: TestResult[];

    @OneToMany(() => MedicalHistoryRecord, (medicalHistoryRecord) => medicalHistoryRecord.patient)
    medicalHistoryRecords: MedicalHistoryRecord[];

}
