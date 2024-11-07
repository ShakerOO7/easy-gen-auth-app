import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repo';
import { UsersService } from './users.service';
import { ConflictException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let repo: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: UserRepository, useValue: {} }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    // Arrange
    repo.exists = jest.fn().mockResolvedValue(false);
    const dto: CreateUserDto = {
      email: 'test@test.com',
      password: '1234QWE!',
      name: 'testing',
    };
    repo.createAndSave = jest.fn().mockReturnValue(dto);
    // Act
    const { email, name } = await service.createUser(dto);
    // Assert
    expect(email).toStrictEqual(dto.email);
    expect(name).toStrictEqual(dto.name);
  });

  it('should NOT create a user if already exists', async () => {
    // Arrange
    repo.exists = jest.fn().mockResolvedValue(true);
    const dto: CreateUserDto = {
      email: 'test@test.com',
      password: '1234QWE!',
      name: 'testing',
    };
    repo.createAndSave = jest.fn().mockReturnValue(dto);
    // Act  Assert
    await expect(service.createUser(dto)).rejects.toThrow(
      new ConflictException('This email is already registered'),
    );
  });
});
