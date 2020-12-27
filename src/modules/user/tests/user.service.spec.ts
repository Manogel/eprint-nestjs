import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import {
  mockAddUserParams,
  mockUpdateUserParams,
  mockUserArrayModel,
  mockUserModel,
  mockUserRepository,
} from '../tests/UserUtil';
import { UserService } from '../user.service';
import { HashModule } from '@providers/hash/hash.module';
import { QueueModule } from '@providers/queue/queue.module';

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HashModule, QueueModule],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should list all users', async () => {
    const users = await service.findAll();

    expect(users).toBe(mockUserArrayModel);
    expect(mockUserRepository.findAll).toBeCalledTimes(1);
  });

  it('should not be return of user inexistent', async () => {
    mockUserRepository.findById.mockReturnValue(null);

    await expect(service.findOne('1')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  describe('CreateUser', () => {
    it('should be create a user', async () => {
      mockUserRepository.findByEmail.mockReturnValue(null);
      const user = await service.create(mockAddUserParams);

      expect(user).toBe(mockUserModel);
      expect(mockUserRepository.createUser).toBeCalledTimes(1);
    });

    it('should not be create user with existent email', async () => {
      mockUserRepository.findByEmail.mockReturnValue(mockUserModel);
      await expect(service.create(mockAddUserParams)).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });
  });

  describe('UpdateUser', () => {
    it('should not be update user deleted', async () => {
      const userDeleted = { ...mockUserModel, deleted_at: new Date() };
      mockUserRepository.findById.mockReturnValue(userDeleted);

      await expect(
        service.update('1', mockUpdateUserParams),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should not be user update with email existent', async () => {
      mockUserRepository.findById.mockReturnValue(mockUserModel);
      mockUpdateUserParams.email = 'other-email@email.com';

      await expect(
        service.update('1', mockUpdateUserParams),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should be update user', async () => {
      mockUserRepository.findById.mockReturnValue(mockUserModel);
      mockUserRepository.findByEmail.mockReturnValue(null);

      const user = await service.update('1', mockUpdateUserParams);

      expect(user.email).toBe(mockUpdateUserParams.email);
      expect(mockUserRepository.save).toBeCalledTimes(1);
    });
  });

  describe('RemoveUser', () => {
    it('should not be remove user deleted', async () => {
      const userDeleted = { ...mockUserModel, deleted_at: new Date() };
      mockUserRepository.findById.mockReturnValue(userDeleted);

      await expect(service.remove('1')).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });

    it('should be remove user', async () => {
      mockUserRepository.findById.mockReturnValue(mockUserModel);
      mockUserRepository.save.mockReturnValue(mockUserModel);

      const userDeleted = await service.remove('1');

      expect(userDeleted.deleted_at).toBeDefined();
    });
  });
});
