import { Appointment } from "src/appointments/entities/appointment.entity";
import { AuditableEntity } from "src/common/entities/auditable.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("payments")
export class Payment extends AuditableEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Appointment, appointment => appointment.payment)
  appointment: Appointment;

  @Column()
  date: Date;

}
