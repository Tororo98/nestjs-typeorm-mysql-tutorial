import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Posts";
import { Profile } from "./Profile";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({unique: true})
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

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

}