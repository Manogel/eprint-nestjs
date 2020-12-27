import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { WelcomeEmailDto } from '@providers/mail/dtos/welcome-email-dto';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('mail')
    private readonly mailQueue: Queue,
  ) {}

  async addSendMail(data: WelcomeEmailDto) {
    await this.mailQueue.add('send-mail', data);
  }
}
