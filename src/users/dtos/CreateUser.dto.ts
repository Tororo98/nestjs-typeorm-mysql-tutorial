import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    @MinLength(3)
    username: string;

    @ApiProperty()
    @IsString()
    @MinLength(3)
    password: string;
}