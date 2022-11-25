import { PipeTransform, BadRequestException } from '@nestjs/common';

import { TaskDto } from './dto/task.dto';

import { TaskSchema } from './dto/task.dto';

export class TaskValidatorPipe implements PipeTransform<TaskDto> {
  public transform(value: TaskDto): TaskDto {
    const result = TaskSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
