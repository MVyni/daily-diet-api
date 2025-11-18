import { app } from "../src/app.js";
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, it, expect } from 'vitest'
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

    it('Should be create a new user', async () => {
            await request(app.server)
            .post('/users/createuser')
            .send({
                name: 'Marcus Vynicius',
                email: 'marcusvynicius@teste.com',
                password: 'marcusvynicius',
                confirmPassword: 'marcusvynicius'
            })
            .expect(201)
    })

    it('User can make login', async () => {
        const createUserResponse = await request(app.server)
            .post('/users/createuser')
            .send({
                name: 'Marcus Vynicius',
                email: 'marcusvynicius@teste.com',
                password: 'marcusvynicius',
                confirmPassword: 'marcusvynicius'
            })
            .expect(201)
        
            
            const loginUserResponse = await request(app.server)
            .post('/users/login')
            .send({
                    email: 'marcusvynicius@teste.com',
                    password_hash: 'marcusvynicius'
                })
            .expect(200)
    })

    it("Should be possible to show all users", async () => {
        const createUserResponse = await request(app.server)
            .post('/users/createuser')
            .send({
                name: 'Marcus Vynicius',
                email: 'marcusvynicius@teste.com',
                password: 'marcusvynicius',
                confirmPassword: 'marcusvynicius'
            })
            .expect(201)

        const createUserResponse2 = await request(app.server)
            .post('/users/createuser')
            .send({
                name: 'Carolina Ferreira',
                email: 'carolinaferreira@teste.com',
                password: 'carolina',
                confirmPassword: 'carolina'
            })
            .expect(201)
        
        const loginUserResponse = await request(app.server)
            .post('/users/login')
            .send({
                email: 'marcusvynicius@teste.com',
                password_hash: 'marcusvynicius'
            })
            .expect(200)
        
        const authToken = loginUserResponse.body.token
        
        const getAllUsers = await request(app.server)
            .get('/users/')
            .set("Authorization", `Bearer ${authToken}`)
            .expect(200)
    })
})

