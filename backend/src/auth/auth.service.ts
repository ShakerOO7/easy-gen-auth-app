import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SigninDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

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
      this.logger.error('User was not found');
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
