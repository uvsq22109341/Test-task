import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CronServiceService } from '../cron-service/cron-service.service';
import { TaskDto } from './dto';
import { LoggingInterceptor } from './logging.interceptor';
import { TaskService } from './task.service';
import { TaskValidatorPipe } from './validation.pipe';

@Controller('task')
@UseInterceptors(new LoggingInterceptor())
export class TaskController {
  constructor(
    private taskservice: TaskService,
    private cron: CronServiceService,
  ) {}
  @Post('addTask')
  createTask(@Body(new TaskValidatorPipe()) dto: TaskDto) {
    const data = {
      taskId: dto.taskId,
      first_date_of_execution: new Date(dto.first_date_of_execution),
      repeat: dto.repeat,
    };
    return this.taskservice.createTask(data);
  }

  @Post('launchCron')
  addCron() {
    return this.cron.addCronJob();
  }
}
