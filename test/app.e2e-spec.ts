import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as pactum from 'pactum';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma/prisma.service';
import { TaskDto } from 'src/task/dto';
import { TaskValidatorPipe } from '../src/task/validation.pipe';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new TaskValidatorPipe());
    await app.init();
    await app.listen(3000);

    prisma = app.get(PrismaService);
    pactum.request.setBaseUrl('http://localhost:3000');
  });
  afterAll(async () => {
    app.close();
  });
  describe('Task', () => {
    const dto: TaskDto = {
      taskId: '04-ED-EF-ffdd',
      first_date_of_execution: new Date('12/19/2022'),
      repeat: 10,
    };
    describe('addTask', () => {
      it('should throw if repeat is not number or empty', () => {
        return pactum
          .spec()
          .post('/task/addTask')
          .withBody({
            taskId: '09-EE-C7-c8fb',
            first_date_of_execution: new Date(),
            repeat: 'aa',
          })
          .expectStatus(400);
      });

      it('should throw if first_date_of_execution is not date or empty or less than current date', () => {
        return pactum
          .spec()
          .post('/task/addTask')
          .withBody({
            taskId: '09-EE-C7-c8fb',
            first_date_of_execution: '08/12/2022',
            repeat: 8,
          })
          .expectStatus(400);
      });
    });

    it('should throw if UUID is empty or not respect conditions (begin with number and contain -)', () => {
      return pactum
        .spec()
        .post('/task/addTask')
        .withBody({
          taskId: 'AA-EE-C7-c8fb',
          first_date_of_execution: new Date(),
          repeat: 9,
        })
        .expectStatus(400);
    });
    it('should add task ', () => {
      return pactum
        .spec()
        .post('/task/addTask')
        .withBody({
          taskId: '04-ED-EF-ffdd',
          first_date_of_execution: new Date('12/19/2022'),
          repeat: 10,
        })
        .expectStatus(201);
    });
    it('should throw if UUID is duplicated ', () => {
      return pactum
        .spec()
        .post('/task/addTask')
        .withBody({
          taskId: '04-DE-C7-c8fb',
          first_date_of_execution: new Date(),
          repeat: 9,
        })
        .expectStatus(400);
    });
  });
});
