import { AdminEntity } from 'nestjs-admin';
import { User } from './user.entity';

export class UserAdmin extends AdminEntity {
  entity = User;
  listDisplay = ['id', 'name', 'email'];
  searchFields = ['name', 'email'];
}
