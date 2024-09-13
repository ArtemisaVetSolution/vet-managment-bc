import { Shift } from 'src/shifts/entities/shift.entity';
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Service } from 'src/services/entities/service.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Entity('collaborators')
export class Collaborator {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shift , shift => shift.collaborators)
  @JoinColumn({ name: 'shift_id' })
  shift: Shift;

  @Column({ name: 'user_id', type: 'uuid'})
  userId: string;

  @Column({ name: 'name', type: 'varchar', length: 255, default: 'Nombre' })
  name: string;

  @ManyToMany(() => Service, service => service.collaborators)
  @JoinTable({name: 'collaborators_services'})
  services: Service[];

  @OneToMany(() => Appointment, appointment => appointment.collaborator)
  appointments: Appointment[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', select: false })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', select: false })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', select: false })
  deletedAt: Date;
}
