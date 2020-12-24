import { hash, compare } from 'bcryptjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptService {
  public async generateHash(payload: string) {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string) {
    return compare(payload, hashed);
  }
}
