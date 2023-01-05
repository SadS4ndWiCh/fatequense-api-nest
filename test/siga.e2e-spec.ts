import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { configureTestModule } from './helpers/configure-test-module';

describe('Siga Controller (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await configureTestModule();

    app = moduleFixture.createNestApplication();
    await app.init();

    const loginResponse = await request(app.getHttpServer())
      .post('/login')
      .send({
        username: process.env.TEST_SIGA_USERNAME,
        password: process.env.TEST_SIGA_PASSWORD,
      });

    token = loginResponse.body.token;
  });

  it('/profile (GET)', () => {
    return request(app.getHttpServer())
      .get('/student/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            profile: expect.objectContaining({
              name: process.env.TEST_SIGA_STUDENT_NAME,
            }),
          }),
        );
      });
  });

  // it('/profile (GET) - should return too many requests', async () => {
  //   const promises: request.Test[] = [];
  //   for (let i = 0; i < 5; i++) {
  //     promises.push(
  //       request(app.getHttpServer())
  //         .get('/student/profile')
  //         .set('Authorization', `Bearer ${token}`)
  //         .set('X-Forwarded-For', '167.250.175.229')
  //         .expect(i < 4 ? 200 : 429),
  //     );
  //   }

  //   const responses = await Promise.allSettled(promises);
  //   responses.forEach((resp) => {
  //     console.log(resp);
  //     expect(resp).not.toEqual(
  //       expect.objectContaining({
  //         status: 'rejected',
  //         reason: expect.anything(),
  //       }),
  //     );
  //   });
  // });

  it('/parial-grade (GET)', () => {
    return request(app.getHttpServer())
      .get('/student/partial-grade')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            partialGrade: expect.arrayContaining([]),
          }),
        );
      });
  });

  it('/partial-absences (GET)', () => {
    return request(app.getHttpServer())
      .get('/student/partial-absences')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            partialAbsences: expect.arrayContaining([]),
          }),
        );
      });
  });

  it('/schedule (GET)', () => {
    return request(app.getHttpServer())
      .get('/student/schedule')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            schedule: expect.arrayContaining([]),
          }),
        );
      });
  });

  it('/history (GET)', () => {
    return request(app.getHttpServer())
      .get('/student/history')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            history: expect.arrayContaining([]),
          }),
        );
      });
  });

  it('/notices (GET)', () => {
    return request(app.getHttpServer())
      .get('/student/notices')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  afterEach(async () => {
    await app.close();
  });
});
