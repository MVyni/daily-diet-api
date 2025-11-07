import { app } from "../src/app.js";
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest'
import { execSync } from "node:child_process";

describe('Users routes', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    beforeEach(() => {
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
    })

    it('Can create a new user', async () => {
        const response = await request(app.server)
            .post('/users/createuser')
            .send({
                name: 'Marcus Vynicius',
                email: 'marcusvynicius@teste.com',
                password: 'marcusvynicius',
                confirmPassword: 'marcusvynicius'
            })
            .expect(201)
    })
})

