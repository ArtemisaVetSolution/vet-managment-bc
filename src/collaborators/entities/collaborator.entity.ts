import { Shift } from 'src/shifts/entities/shift.entity';
import { Column,Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity('collaborators')
export class Collaborator {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shift , shift => shift.collaborators)
  @JoinColumn({ name: 'shift_id' })
  shift: Shift;

  @Column( { name: 'user_id' })
  userId: number;

  @Column()
  active: boolean;
  
  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;
}
