import { SendEmailDto } from './Send-email-dto';

export interface WelcomeEmailDto extends SendEmailDto {
  contextData: {
    name: string;
  };
}
