import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({name: 'user_profiles'})
export class Profile {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    dob: string;

    @OneToMany(() => User, (user) => user.username)
    following: User[];
}