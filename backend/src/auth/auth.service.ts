import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDto, SignUpDto } from './dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    // hash the user password
    const passwordHash = await bcrypt.hash(signUpDto.password, 10);
    return this.usersService.createUser({
      ...signUpDto,
      password: passwordHash,
    });
  }

  async signIn(signInDto: SigninDto) {
    const user = await this.usersService.findUserByEmail(signInDto.email);
    if (!user) {
      throw new UnauthorizedException(
        'The Password or the email might be incorrect',
      );
    }
    const passwordMatch = bcrypt.compare(signInDto.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException(
        'The Password or the email might be incorrect',
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
