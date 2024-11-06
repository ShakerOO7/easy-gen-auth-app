import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repo';

@Injectable()
export class UsersService {
  constructor(private userRepo: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    const exists = await this.userRepo.exists(createUserDto.email);
    if (exists) {
      throw new ConflictException('This email is already registered');
    }
    const user = await this.userRepo.createAndSave(createUserDto);
    return { email: user.email, name: user.name };
  }

  findUserByEmail(email: string) {
    return this.userRepo.findByEmail(email);
  }

  async userExists(email: string): Promise<boolean> {
    return this.userRepo.exists(email);
  }
}
