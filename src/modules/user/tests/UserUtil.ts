import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export const mockAddUserParams: CreateUserDto = {
  name: 'Test User',
  email: 'user@email.com',
  password: '12345',
  profile: 'USER',
  avatar: 'aaaaa.jpg',
};

export const mockUpdateUserParams: UpdateUserDto = {
  email: 'email-updated@email.com',
};

export const mockUserModel: User = {
  id: '1',
  ...mockAddUserParams,
  is_active: true,
};

export const mockUpdatedUserModel: User = {
  ...mockUserModel,
  email: 'updated-email@email.com',
};

export const mockUserArrayModel: User[] = [
  mockUserModel,
  {
    ...mockUserModel,
    id: '2',
    email: 'test2@test.com',
  },
  {
    ...mockUserModel,
    id: '3',
    email: 'test3@test.com',
  },
];

export const mockUserRepository = {
  save: jest.fn().mockReturnValue(mockUserModel),
  createUser: jest.fn().mockReturnValue(mockUserModel),
  findAll: jest.fn().mockReturnValue(mockUserArrayModel),
  findByEmail: jest.fn().mockReturnValue(mockUserModel),
  findById: jest.fn().mockReturnValue(mockUserModel),
};
