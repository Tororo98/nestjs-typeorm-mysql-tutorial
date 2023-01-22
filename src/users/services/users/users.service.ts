import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Posts';
import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { DeleteStatusResponse, PatchStatusResponse, PostStatusResponse } from 'src/users/schemas/user.response';
import { ErrorHandler } from 'src/utils/errors/errorhandler';
import { CreateUserParams, CreateUserPostParams, CreateUserProfileParams, UpdateUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        @InjectRepository(Post) private postRepository: Repository<Post>,
    ) {}

    async findMany() {
        let users = await this.userRepository.find({relations: ['profile', 'posts']});
        if(users.length==0) throw new HttpException('No Available Information', HttpStatus.BAD_REQUEST);
        return users;
    }

    async createMany(userDetails: CreateUserParams): Promise<PostStatusResponse> {
        if(!userDetails.username || !userDetails.password) throw ErrorHandler.invalidInfoError('Invalid Params');
        let newUser = this.userRepository.create({ ...userDetails, createdAt: new Date()});
        await this.userRepository.save(newUser);

        return { status: 'User Created' };
    }

    async updateUser(id: number, updateUserDetail: UpdateUserParams): Promise<PatchStatusResponse> {
        let user = await this.userRepository.findOne({where: {id: id}});
        if(!user) throw ErrorHandler.invalidInfoError('User Not Found');
        await this.userRepository.update({id}, { ...updateUserDetail});

        return { status: 'User Updated'}
    }

    async deleteUser(id: number): Promise<DeleteStatusResponse> {
        let user = await this.userRepository.findOne({where: {id: id}});
        if(!user) throw ErrorHandler.invalidInfoError('User Not Found');        
        await this.userRepository.delete({id});

        return { status: 'User Deleted'}
    }

    async createUserProfile(id: number, userProfileDetails: CreateUserProfileParams): Promise<PostStatusResponse> {
        let user = await this.userRepository.findOne({where: {id: id}});
        if(!user) throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
        if(!userProfileDetails.age || !userProfileDetails.dob || !userProfileDetails.firstName) throw ErrorHandler.invalidInfoError('Invalid Params');

        let newProfile = this.profileRepository.create(userProfileDetails);
        
        let savedProfile = await this.profileRepository.save(newProfile);
        user.profile = savedProfile
        this.userRepository.save(user);
        
        return {status: 'Profile Created'}
    }

    async createUserPost(id: number, postDetails: CreateUserPostParams): Promise<PostStatusResponse> {
        let user = await this.userRepository.findOne({where: {id: id}});
        if(!user) throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
        if(!postDetails.title || !postDetails.description) throw ErrorHandler.invalidInfoError('Invalid Params');

        let newPost = this.postRepository.create({
            ...postDetails,
            user
        });
        await this.postRepository.save(newPost);

        return {status: 'Post Created'}
    }
}
