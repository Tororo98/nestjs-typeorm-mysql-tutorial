import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { PostStatusResponse } from 'src/users/schemas/user.response';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
    ) {}

    @Get()
    async getUsers() {
        let users = await this.userService.findMany();
        return users;
    }

    @Post()
    async postUsers(@Body() createUserDto: CreateUserDto): Promise<PostStatusResponse> {
        return await this.userService.createMany(createUserDto);
    }

    @Patch(':id')
    async updateUserById(
        @Param('id', ParseIntPipe ) id: number, 
        @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUserById(
        @Param('id', ParseIntPipe ) id: number) {
        return await this.userService.deleteUser(id);
    }

    @Post(':id/profiles')
    async createUserProfile(
        @Param('id', ParseIntPipe ) id: number,
        @Body() createUserProfileDto: CreateUserProfileDto): Promise<PostStatusResponse> {
        
        return await this.userService.createUserProfile(id,createUserProfileDto);
    }

    @Post(':id/posts')
    async createUserPost(
        @Param('id', ParseIntPipe ) id: number,
        @Body() createUserPostDto: CreateUserPostDto): Promise<PostStatusResponse> {

        return await this.userService.createUserPost(id, createUserPostDto);
    }
}
