import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { PostStatusResponse } from 'src/users/schemas/user.response';
import { CreateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    findMany() {
        return this.userRepository.find();
    }

    async createMany(userDetails: CreateUserParams): Promise<PostStatusResponse> {
        let newUser = this.userRepository.create({ ...userDetails, createdAt: new Date()});
        await this.userRepository.save(newUser);

        return { status: 'succes' };
    }
}
