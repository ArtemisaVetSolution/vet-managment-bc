import { AuditableEntity } from "src/common/entities/auditable.entity";
import { Patient } from "src/patients/entities/patient.entity";
import { Service } from "src/services/entities/service.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tests_results')
export class TestResult extends AuditableEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    fileName: string;

    @Column()
    fileMimetype: string;

    @Column()
    filePath: string;

    @Column()
    date: Date;

    @ManyToOne(() => Patient, (patient) => patient.testsResults)
    @JoinColumn({ name: 'patient_id'})
    patient: Patient;

    @ManyToOne(() => Service, (service) => service.testsResults)
    @JoinColumn(({ name: 'service_id'}))
    service: Service;
}
