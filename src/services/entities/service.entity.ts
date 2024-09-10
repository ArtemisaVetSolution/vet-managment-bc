import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Collaborator } from 'src/collaborators/entities/collaborator.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('services')
export class Service {
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

}
