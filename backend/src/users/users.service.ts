import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repo';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(private userRepo: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    const exists = await this.userRepo.exists(createUserDto.email);
    if (exists) {
      this.logger.error(`Email ${createUserDto.email} is already registered`);
      throw new ConflictException('This email is already registered');
    }
    const user = await this.userRepo.createAndSave(createUserDto);
    return { email: user.email, name: user.name };
  }

  findUserByEmail(email: string) {
    return this.userRepo.findByEmail(email);
  }

  userExists(email: string) {
    return this.userRepo.exists(email);
  }
}
