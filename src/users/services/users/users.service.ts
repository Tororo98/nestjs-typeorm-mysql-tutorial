import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { DeleteStatusResponse, PatchStatusResponse, PostStatusResponse } from 'src/users/schemas/user.response';
import { ErrorHandler } from 'src/utils/errors/errorhandler';
import { CreateUserParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async findMany() {
        return await this.userRepository.find();
    }

    async createMany(userDetails: CreateUserParams): Promise<PostStatusResponse> {
        let newUser = this.userRepository.create({ ...userDetails, createdAt: new Date()});
        await this.userRepository.save(newUser);

        return { status: 'Success' };
    }

    async updateUser(id: number, updateUserDetail: UpdateUserParams): Promise<PatchStatusResponse> {
        let user = await this.userRepository.findOne({where: {id: id}});
        if(!user) throw ErrorHandler.invalidInfoError('User Not Found');
        await this.userRepository.update({id}, { ...updateUserDetail});

        return { status: 'Updated'}
    }

    async deleteUser(id: number): Promise<DeleteStatusResponse> {
        let user = await this.userRepository.findOne({where: {id: id}});
        if(!user) throw ErrorHandler.invalidInfoError('User Not Found');        
        await this.userRepository.delete({id});

        return { status: 'Deleted'}
    }
}
