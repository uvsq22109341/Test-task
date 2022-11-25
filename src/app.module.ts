import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma/prisma.module';
import { LoggingInterceptor } from './task/logging.interceptor';
import { TaskModule } from './task/task.module';
import { CronServiceService } from './cron-service/cron-service.service';

@Module({
  imports: [TaskModule, PrismaModule, ScheduleModule.forRoot()],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    CronServiceService,
  ],
})
export class AppModule {}
