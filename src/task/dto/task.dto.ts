import * as Joi from 'joi';

export interface TaskDto {
  taskId: string;
  first_date_of_execution: Date;
  repeat: number;
}

export const TaskSchema = Joi.object({
  taskId: Joi.string()
    .pattern(new RegExp('^[0-9]{2}-[a-fA-F]{2}-[0-9a-fA-F]{2}-[0-9a-fA-F]{4}$'))
    .required(),
  first_date_of_execution: Joi.date().greater('now').required(),
  repeat: Joi.number().required(),
}).options({
  abortEarly: false,
});
