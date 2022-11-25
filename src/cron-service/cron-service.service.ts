import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { PrismaService } from '../prisma/prisma/prisma.service';
@Injectable()
export class CronServiceService {
  private readonly logger = new Logger(CronServiceService.name);
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private prisma: PrismaService,
  ) {}

  @Cron('0 30 11 * * 1-5', {
    name: 'tasks',
  })
  async triggertasks() {
    const tasks = await this.prisma.task.findMany({
      where: {
        repeat: { gte: 0 },
        first_date_of_execution: { gte: new Date() },
      },
    });
    tasks.forEach(async (t) => {
      if (t.first_date_of_execution.getDate() == Date.now()) {
        Logger.log(`task with id = ${t.taskId} will run `);
        t.repeat -= 1;

        await this.prisma.task.update({
          where: {
            taskId: t.taskId,
          },
          data: {
            repeat: t.repeat,
          },
        });
      }
    });
  }

  addCronJob() {
    const job = new CronJob(`* * * * * *`, async () => {
      const tasks = await this.prisma.task.findMany({
        where: {
          repeat: { gt: 0 },
          first_date_of_execution: { lte: new Date() },
        },
      });
      tasks.forEach(async (t) => {
        Logger.log(`task with id = ${t.taskId} will run `);
        t.repeat -= 1;

        await this.prisma.task.update({
          where: {
            taskId: t.taskId,
          },
          data: {
            repeat: t.repeat,
          },
        });
      });
      //  console.log('jjshsjshsjshsjshh');
    });

    this.schedulerRegistry.addCronJob('taskCronJob', job);
    job.start();

    this.logger.warn(`job taskCronJob is running`);
  }
}
