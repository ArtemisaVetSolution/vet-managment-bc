import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Collaborator } from 'src/collaborators/entities/collaborator.entity';
import { AuditableEntity } from 'src/common/entities/auditable.entity';
import { TestResult } from 'src/tests-results/entities/test-result.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('services')
export class Service extends AuditableEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToMany(() => Collaborator)
  collaborators: Collaborator[];

  @OneToMany(() => Appointment, appointment => appointment.service)
  appointments: Appointment[];

  @OneToMany(() => TestResult, (testResult) => testResult.service)
  testsResults: TestResult[];
}
