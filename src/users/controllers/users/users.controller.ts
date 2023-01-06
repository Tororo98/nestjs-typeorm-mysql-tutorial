import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
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
}
