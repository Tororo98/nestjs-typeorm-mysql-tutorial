import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Followers } from './typeorm/entities/Followers';
import { Post } from './typeorm/entities/Posts';
import { Profile } from './typeorm/entities/Profile';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { FollowersModule } from './followers/followers.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'S3cretadm0n*1998',
    database: 'nestjs_mysql_tutorial',
    entities: [User, Profile, Post, Followers],
    synchronize: true,
  }), UsersModule, FollowersModule],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
