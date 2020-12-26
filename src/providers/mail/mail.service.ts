import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { DefaultEmailDto } from './dtos/default-email-dto';
import { WelcomeEmailDto } from './dtos/welcome-email-dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  private async sendEmail(data: DefaultEmailDto) {
    const { to, subject, template, contextData } = data;

    this.mailerService.sendMail({
      to,
      from: 'noreply@nestjs.com',
      subject,
      template,
      context: contextData,
    });
  }

  public async sendWelcomeEmail(email: WelcomeEmailDto) {
    const { to, subject, contextData } = email;

    this.sendEmail({
      to,
      subject,
      template: 'welcome',
      contextData,
    });
  }
}
