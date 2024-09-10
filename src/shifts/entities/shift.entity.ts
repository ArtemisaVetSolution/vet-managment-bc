
import { Collaborator } from 'src/collaborators/entities/collaborator.entity';
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('shifts')
export class Shift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'start_time' })
  startTime: string;

  @Column({ name: 'end_time' })
  endTime: string;

  @OneToMany(() => Collaborator, collaborator => collaborator.shift)
  collaborators: Collaborator;
}
