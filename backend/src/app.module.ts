import { HttpModule, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { typeOrmConfig } from './config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MobileModule } from './mobile/mobile.module';
import { WebModule } from './web/web.module';
import { ResponseTransformInterceptor } from './shared/interceptor/response.interceptor';
import { ErrorsInterceptor } from './shared/interceptor/error.interceptor';
import { ScheduleModule } from '@nestjs/schedule';
import { JobModule } from './cronjobs/job.module';
import { PromoCodeModule } from './cronjobs/promocode.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        port: 465,
        secure: true,
        auth: {
          user: process.env.SENDGRID_USER,
          pass: process.env.SENDGRID_API,
        },
      },
      defaults: {
        from: `"loantack" <${process.env.SENDGRID_API}>`,
      },
      template: {
        dir: __dirname + '/../email_template',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    HttpModule,
    PromoCodeModule,
    JobModule,
    MobileModule,
    WebModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule { }
