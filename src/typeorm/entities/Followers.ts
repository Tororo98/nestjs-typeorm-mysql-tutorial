import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({name: 'followers'})
export class Followers {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => User, user => user.following)
    @JoinTable()
    user: User;

    @ManyToMany(() => User, user => user.followers)
    @JoinTable()
    follower: User;

}