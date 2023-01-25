import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Followers } from 'src/typeorm/entities/Followers';
import { User } from 'src/typeorm/entities/User';
import { FollowersService } from './services/followers/followers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Followers, User])],
  providers: [FollowersService]
})
export class FollowersModule {}
