import { Collaborator } from 'src/collaborators/entities/collaborator.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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

}
