import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { TaskDto } from './dto';
@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  async createTask(taskDto: TaskDto) {
    const task = await this.prisma.task.create({
      data: {
        taskId: taskDto.taskId,
        first_date_of_execution: taskDto.first_date_of_execution,
        repeat: taskDto.repeat,
      },
    });
    return task;
  }
}
