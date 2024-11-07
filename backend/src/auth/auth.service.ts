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
    const passwordHash = await this.hashPassword(signUpDto);
    const user = await this.usersService.createUser({
      ...signUpDto,
      password: passwordHash,
    });
    this.logger.log(`Sign up successfull for user ${signUpDto.email}`);
    return user;
  }

  private async hashPassword(signUpDto: SignUpDto) {
    return await bcrypt.hash(signUpDto.password, 10);
  }

  async signIn(signInDto: SigninDto) {
    const user = await this.usersService.findUserByEmail(signInDto.email);
    if (!user) {
      this.logger.error(`User ${signInDto.email} was not found`);
      throw new UnauthorizedException(
        'The Password or the email might be incorrect',
      );
    }
    const passwordMatch = await this.comparePasswords(
      signInDto.password,
      user.password,
    );
    if (!passwordMatch) {
      this.logger.error(`Incorrect password for user ${signInDto.email}`);
      throw new UnauthorizedException(
        'The Password or the email might be incorrect',
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    this.logger.log(`Sign in successfull for user ${signInDto.email}`);
    return { accessToken };
  }

  private comparePasswords(password: string, hashPassword: string) {
    return bcrypt.compare(password, hashPassword);
  }
}
