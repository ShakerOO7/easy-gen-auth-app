import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { SigninDto, SignUpDto } from './dto';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

// mocke the bcrypt
jest.mock('bcrypt', () => ({
  hash: (p: string) => 'hashed' + p,
  compare: (p: string, hashed: string) => hashed === 'hashed' + p,
}));

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: {} },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Sign Up', () => {
    it('Should call userService.createUser with the hashed password', async () => {
      // Arrange
      const dto: SignUpDto = {
        email: 'testing@email.com',
        password: '1234QWEQ@',
        name: 'name',
      };
      usersService.createUser = jest.fn();
      const passwordHash = await bcrypt.hash(dto.password, 10);
      // Act
      await service.signUp(dto);
      // Assert
      expect(usersService.createUser).toBeCalledWith({
        ...dto,
        password: passwordHash,
      });
    });
  });

  describe('Sign in', () => {
    it('Should throw unauthorized error if the user was not found', async () => {
      // Arrange
      const dto = {
        email: 'testing@email.com',
        password: '1234QWEQ@',
      };
      usersService.findUserByEmail = jest.fn().mockResolvedValue(undefined);
      // Act  Assert
      await expect(service.signIn(dto)).rejects.toThrow(
        new UnauthorizedException(
          'The Password or the email might be incorrect',
        ),
      );
    });
    it("Should throw unauthorized error if the passwords didn't match", async () => {
      // Arrange
      const dto = {
        email: 'testing@email.com',
        password: '1234QWEQ@',
      };
      usersService.findUserByEmail = jest.fn().mockResolvedValue({
        email: dto.email,
        password: 'Some other hased password',
      });
      // Act  Assert
      await expect(service.signIn(dto)).rejects.toThrow(
        new UnauthorizedException(
          'The Password or the email might be incorrect',
        ),
      );
    });
    it('should return the access token after sign in', async () => {
      // arrange
      const dto: SigninDto = { email: 'test@test.com', password: '1234qwe!' };
      usersService.findUserByEmail = jest.fn().mockResolvedValue({
        email: dto.email,
        name: 'name',
        password: await bcrypt.hash(dto.password, 10),
      });
      const accessTokenMock = 'access token here';
      jwtService.signAsync = jest.fn().mockResolvedValue(accessTokenMock);
      // Act
      const { accessToken } = await service.signIn(dto);
      // Assert
      expect(accessToken).toStrictEqual(accessTokenMock);
    });
  });
});
