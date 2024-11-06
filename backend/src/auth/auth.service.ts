import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(signupDto: SignUpDto) {
    // hash the user password
    const passwordHash = await bcrypt.hash(signupDto.password, 10);
    return this.usersService.createUser({
      ...signupDto,
      password: passwordHash,
    });
  }
}
