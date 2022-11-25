import { Module } from '@nestjs/common';
import { CronServiceService } from '../cron-service/cron-service.service';
import { PrismaModule } from '../prisma/prisma/prisma.module';
import { LoggingInterceptor } from './logging.interceptor';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [PrismaModule],
  controllers: [TaskController],
  providers: [TaskService, LoggingInterceptor, CronServiceService],
})
export class TaskModule {}
