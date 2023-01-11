import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateUserProfileDto {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    firstName: string;

    @ApiProperty()
    @IsString()
    @MinLength(3)
    lastName: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    age: number;

    @ApiProperty()
    @IsString()
    @MinLength(3)
    dob: string;

}