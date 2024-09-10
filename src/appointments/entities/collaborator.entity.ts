import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./appointment.entity";

@Entity('collaborator')
export class Collaborator {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column({ default: '08:00:00'})
    startTime: string;

    @Column({ default: '17:00:00'})
    endTime: string;

    @OneToMany(() => Appointment, (appointment) => appointment.collaborator)
    appointments: Appointment[];
}