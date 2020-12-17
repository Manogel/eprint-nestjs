import { BcryptService } from '@modules/bcrypt/bcrypt.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseQueryParamsDTO from '@utils/query-params.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) {
      throw new BadRequestException('Email em uso');
    }

    const password = createUserDto.password;
    createUserDto.password = await this.bcryptService.generateHash(password);

    const user = await this.userRepository.createUser(createUserDto);
    return user;
  }

  async findAll(query?: BaseQueryParamsDTO) {
    const users = await this.userRepository.findAll(query);

    return users;
  }

  findOne(userId: string) {
    return this.userRepository.findById(userId);
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const { email } = updateUserDto;

    const user = await this.userRepository.findById(userId);

    if (user.deleted_at) {
      throw new BadRequestException('Este usuário foi deletedo');
    }

    if (email && user.email !== email) {
      const emailInUse = await this.userRepository.findByEmail(email);

      if (emailInUse) throw new BadRequestException('Email em uso');
    }

    Object.assign(user, updateUserDto);

    await this.userRepository.save(user);

    return user;
  }

  async remove(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    if (user.deleted_at) {
      throw new BadRequestException('Usuário já foi excluído');
    }

    user.deleted_at = new Date();
    user.is_active = false;

    await this.userRepository.save(user);

    return user;
  }
}
