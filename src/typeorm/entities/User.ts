import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./Profile";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    createdAt: Date;

    @Column({nullable: true})
    authStrategy: string;

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;
}