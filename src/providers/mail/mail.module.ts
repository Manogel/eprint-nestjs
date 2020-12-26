import { Module } from '@nestjs/common';
import path from 'path';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { getAsyncMailConfig } from '@config/mail';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => {
        const config = getAsyncMailConfig();

        const transport = {
          host: config.connection.host,
          port: config.connection.port,
          auth: {
            user: config.connection.user,
            pass: config.connection.pass,
          },
        };

        const defaults = {
          name: config.defaults.from.name,
          from: config.defaults.from.email,
        };

        return {
          transport,
          defaults: {
            from: `${defaults.name} <${defaults.from}>`,
          },
          template: {
            // working from root
            dir: path.resolve(__dirname, 'templates').replace('/src', ''),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [MailService],
  controllers: [],
})
export class MailModule {}
