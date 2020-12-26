import { ContextDataDto } from './context-data-dto';
import { SendEmailDto } from './Send-email-dto';

export interface DefaultEmailDto extends SendEmailDto {
  template?: string;
  contextData?: ContextDataDto;
}
