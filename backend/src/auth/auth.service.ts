import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(signupDto: SignupDto) {
    // hash the user password
    signupDto.password = await bcrypt.hash(signupDto.password, 10);
    return this.usersService.createUser(signupDto);
  }
}
