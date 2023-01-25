import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowUserDto } from 'src/followers/dtos/FollowUser.dto';
import { Followers } from 'src/typeorm/entities/Followers';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class FollowersService {
    constructor(
        @InjectRepository(Followers) private followerRepo: Repository<Followers>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async followUser(id: number, followDetails: FollowUserDto) {
        let user = await this.userRepository.findOne({where: {id: id}});
        if(!user) throw new HttpException('User Not Found, Cannot follow', HttpStatus.BAD_REQUEST);

        let newFollow = this.followerRepo.create({
            id,
            ...followDetails
        });
        await this.followerRepo.save(newFollow);

        return {status: 'User Followed'};
    }
}
