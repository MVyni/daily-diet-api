import { app } from "../src/app.js";
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, it, expect } from 'vitest'
import { execSync } from "node:child_process";

describe("Meals Routes", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    beforeEach(() => {
        execSync("npm run knex migrate:rollback --all")
        execSync('npm run knex migrate:latest')
    })

    it("Should be possible for the user to create a meal", async () => {
        const createUserResponse = await request(app.server)
            .post('/users/createuser')
            .send({
                user_id: '123',
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

        const authToken = loginUserResponse.body.token
        
        await request(app.server)
            .post("/meals/createmeals")
            .set("Authorization", `Bearer ${authToken}`)
            .send({
                name: 'Rice with meat',
                description: '200g of rice and 150g of meat',
                date_time: '2025-11-14T19:04:00.000Z',
                is_on_diet: true
            })
            .expect(201)
    })

    it('Showld be to get meals', async() => {
        const createUserResponse = await request(app.server)
            .post('/users/createuser')
            .send({
                user_id: '123',
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

        const authToken = loginUserResponse.body.token

        const createMealsResponse = await request(app.server)
            .post("/meals/createmeals")
            .set("Authorization", `Bearer ${authToken}`)
            .send({
                name: 'Rice with meat',
                description: '200g of rice and 150g of meat',
                date_time: '2025-11-14T19:04:00.000Z',
                is_on_diet: true
            })
            .expect(201)
            
        const createGetAllMeals = await request(app.server)
            .get("/meals/")
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
        
        expect(createGetAllMeals.body).toEqual(createGetAllMeals.body)
    })

    it('Should be able to get a especific meal', async () => {
        const createUserResponse = await request(app.server)
            .post('/users/createuser')
            .send({
                user_id: '123',
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

        const authToken = loginUserResponse.body.token

        const createMealsResponse = await request(app.server)
            .post("/meals/createmeals")
            .set("Authorization", `Bearer ${authToken}`)
            .send({
                name: 'Rice with meat',
                description: '200g of rice and 150g of meat',
                date_time: '2025-11-14T19:04:00.000Z',
                is_on_diet: true
            })
            .expect(201)
        
        const createGetAllMeals = await request(app.server)
            .get("/meals/")
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
        
        const mealId = createGetAllMeals.body[0].id
        
        const getEspecifMeal = await request(app.server)
            .get(`/meals/${mealId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
    })

    it('The user should be able to edit a meal', async () => {
        const createUserResponse = await request(app.server)
            .post('/users/createuser')
            .send({
                user_id: '123',
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

        const authToken = loginUserResponse.body.token

        const createMealsResponse = await request(app.server)
            .post("/meals/createmeals")
            .set("Authorization", `Bearer ${authToken}`)
            .send({
                name: 'Rice with meat',
                description: '200g of rice and 150g of meat',
                date_time: '2025-11-14T19:04:00.000Z',
                is_on_diet: true
            })
            .expect(201)
        
        const createGetAllMeals = await request(app.server)
            .get("/meals/")
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)

        const mealId = createGetAllMeals.body[0].id

        const updateMealResponse = await request(app.server)
            .put(`/meals/editmeal/${mealId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                name: 'Pasta with bolognesa',
                description: '350g of pasta and 200g of meat',
                date_time: '2025-11-18T21:21:00.000Z',
                is_on_diet: true
            })
            .expect(200)
    })

    it('The user should be able to delete a especific meal', async () => {
        const createUserResponse = await request(app.server)
            .post('/users/createuser')
            .send({
                user_id: '123',
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

        const authToken = loginUserResponse.body.token

        const createMealsResponse = await request(app.server)
            .post("/meals/createmeals")
            .set("Authorization", `Bearer ${authToken}`)
            .send({
                name: 'Rice with meat',
                description: '200g of rice and 150g of meat',
                date_time: '2025-11-14T19:04:00.000Z',
                is_on_diet: true
            })
            .expect(201)

        const createGetAllMeals = await request(app.server)
            .get("/meals/")
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)

        const mealId = createGetAllMeals.body[0].id

        const deleteMeal = await request(app.server)
            .delete(`/meals/deletemeal/${mealId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)

        expect(deleteMeal.body).toEqual({})
    })

    it('Should be able to list the all metrics', async () => {
        const createUserResponse = await request(app.server)
            .post('/users/createuser')
            .send({
                user_id: '123',
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

        const authToken = loginUserResponse.body.token

        const createMealsResponse = await request(app.server)
            .post("/meals/createmeals")
            .set("Authorization", `Bearer ${authToken}`)
            .send({
                name: 'Rice with meat',
                description: '200g of rice and 150g of meat',
                date_time: '2025-11-14T19:04:00.000Z',
                is_on_diet: true
            })
            .expect(201)
        
        const createMealsResponse2 = await request(app.server)
            .post("/meals/createmeals")
            .set("Authorization", `Bearer ${authToken}`)
            .send({
                name: 'Strogonoff of meat with fries',
                description: '200g of rice, 150g of chicken and fries',
                date_time: '2025-11-14T19:04:00.000Z',
                is_on_diet: true
            })
            .expect(201)
        
        const createGetAllMeals = await request(app.server)
            .get("/meals/")
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)

        const mealId = createGetAllMeals.body

        const userId = createUserResponse.body.id

        const getMetricsMealsResponse = await request(app.server)
            .get(`/meals/metrics/${userId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)

            expect(getMetricsMealsResponse.body.totalMeals).toBe(2)
            expect(getMetricsMealsResponse.body.mealsOnDiet).toBe(2)
            expect(getMetricsMealsResponse.body.mealsOffDiet).toBe(0)
            expect(getMetricsMealsResponse.body.bestOnDietSequence).toBe(2)
    })
})