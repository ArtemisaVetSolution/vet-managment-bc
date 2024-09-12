import { AuditableEntity } from "src/common/entities/auditable.entity";
import { Patient } from "src/patients/entities/patient.entity";
import { Service } from "src/services/entities/service.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('diagnostic_aids')
export class DxAidsResult extends AuditableEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    result: string;

    @Column()
    date: Date;

    @ManyToOne(() => Patient, (patient) => patient.dxAidsResults)
    @JoinColumn({ name: 'patient_id'})
    patient: Patient;

    @ManyToOne(() => Service, (service) => service.dxAidsResults)
    @JoinColumn(({ name: 'service_id'}))
    service: Service;
}
