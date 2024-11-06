import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repo';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: UserRepository,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    this.userRepo.save(user);
  }

  findUserByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }
}
