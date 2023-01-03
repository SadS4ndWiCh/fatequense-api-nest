import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '@infra/app.module';

describe('Siga Controller (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

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
});
