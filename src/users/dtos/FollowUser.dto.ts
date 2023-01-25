import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class FollowUserDto {
    @ApiProperty()
    @IsNumber()
    myId: number;
}