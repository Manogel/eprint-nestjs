import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { WelcomeEmailDto } from './dtos/welcome-email-dto';
import { MailService } from './mail.service';

@Processor('mail')
export class MailProcessor {
  private readonly logger = new Logger(MailProcessor.name);

  constructor(private readonly mailService: MailService) {}

  @Process('send-mail')
  handleTranscode(job: Job<WelcomeEmailDto>) {
    this.logger.debug('Start transcoding...');
    this.logger.debug(job.data);
    this.mailService.sendWelcomeEmail(job.data);
    this.logger.debug('Transcoding completed');
  }
}
