import { Gender } from "src/common/enums/gender.enum";
import { Species } from "src/common/enums/species.enum";
import { Tutor } from "src/tutors/entities/tutor.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({
        type: 'float'
    })
    weight: number;

    @Column()
    alimentation: string;

    @ManyToOne(() => Tutor, (tutor) => tutor.patients)
    @JoinColumn({ name: 'tutor_id' })
    tutor: Tutor;

    // @CreateDateColumn({
    //     name: 'created_at',
    //     type: 'timestamptz',
    //     default: () => `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`,
    //     select: false,
    // })
    // createdAt: Date;

    // @UpdateDateColumn({
    //     name: 'updated_at',
    //     type: 'timestamptz',
    //     default: () => `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`,
    //     onUpdate: `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`,
    //     select: false,
    // })
    // updatedAt: Date;

    // @DeleteDateColumn({
    //     name: 'deleted_at',
    //     type: 'timestamptz',
    //     default: () => `CURRENT_TIMESTAMP AT TIME ZONE 'GMT-5'`,
    //     select: false,
    // })
    // deletedAt: Date;

}
