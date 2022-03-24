import 'jest';
import * as express from 'express';
import supertest from 'supertest';
import { app as App } from "../../src/main";

describe('Users integration tests', () => {
    let app: express.Application;

    beforeAll(async() => {
        app = App;
    });
    it('Can get all users', async () => {
        await supertest(app)
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect((res: supertest.Response) => {
                // eslint-disable-next-line no-console
                console.log(res.text);
            })
            .expect(200);
    });
});