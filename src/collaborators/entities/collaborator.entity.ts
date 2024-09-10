import { Shift } from 'src/shifts/entities/shift.entity';
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { Service } from 'src/services/entities/service.entity';

@Entity('collaborators')
export class Collaborator {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shift , shift => shift.collaborators)
  @JoinColumn({ name: 'shift_id' })
  shift: Shift;

  @Column( { name: 'user_id' })
  userId: number;

  @Column({
    default: true,
  })
  active: boolean;

  @ManyToMany(() => Service)
  @JoinTable({name: 'collaborators_services'})
  services: Service[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', select: false })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', select: false })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', select: false })
  deletedAt: Date;
}
