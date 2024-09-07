
import { Collaborator } from 'src/collaborators/entities/collaborator.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity('shifts')
export class Shift {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'start_time' })
  startTime: Date;

  @Column({ name: 'end_time' })
  endTime: Date;

  @OneToMany(() => Collaborator, collaborator => collaborator.shift)
  collaborators: Collaborator;
}
