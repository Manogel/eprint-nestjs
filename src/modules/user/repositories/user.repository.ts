import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  createUser(createUserDto: CreateUserDto) {
    const user = this.create(createUserDto);

    return this.save(user);
  }

  async findAll() {
    const users = await this.find();

    return users;
  }

  async findByEmail(email: string) {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(userId: string) {
    const user = await this.findOne(userId);

    return user;
  }
}
