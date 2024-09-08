import { Gender } from "src/common/enums/gender.enum";
import { Species } from "src/common/enums/species.enum";
import { Tutor } from "src/tutors/entities/tutor.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: Species
    })
    specie: Species;

    @Column()
    breed: string;

    @Column({
        type: 'enum',
        enum: Gender
    })
    gender: Gender;

    @Column({
        nullable: true,
        name: 'date_of_birth'
    })
    dob: Date;

    @Column()
    weight: number;

    @Column()
    alimentation: string;

    @ManyToOne(() => Tutor, (tutor) => tutor.patients )
    @JoinColumn({ name: 'tutor_id' })
    tutor: Tutor
}
