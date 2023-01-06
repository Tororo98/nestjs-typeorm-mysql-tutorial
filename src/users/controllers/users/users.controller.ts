import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
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
}
