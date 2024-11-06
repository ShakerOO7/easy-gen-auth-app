import { Module } from '@nestjs/common';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user.repo';

@Module({
  providers: [UsersService, UserRepository],
  exports: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UsersModule {}
