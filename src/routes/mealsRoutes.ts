import type { FastifyInstance } from "fastify";
import { authJwt } from "../configs/getToken.js";
import { z } from "zod";
import { knex } from "../database.js";
import { randomUUID } from "node:crypto";

interface MealParams {
    id: string
}

interface MealRoutes {
    Params: MealParams
}

export async function mealsRoutes(app: FastifyInstance) {

    app.post('/createmeals', {
        preHandler: [
            authJwt
        ]
    }, async (req, res) => {

        const userId = req.user?.id
        const createMealsBodySchema = z.object({
            name: z.string(),
            description: z.string(),
            date_time: z.coerce.date(),
            is_on_diet: z.boolean()
        })

        const { name, description, date_time, is_on_diet } = createMealsBodySchema.parse(req.body)

        await knex('meals')
            .insert({
                id: randomUUID(),
                user_id: userId,
                name,
                description,
                date_time,
                is_on_diet
            })

        return res.status(201).send({ message: 'Meal create successfully' })
    })

    app.get('/', {
        preHandler: [
            authJwt
        ]
    }, async (req, res) => {
        const meals = await knex('meals')
            .select('*')
            .where('user_id', req.user?.id)

        return res.status(200).send(meals)
    })

    app.get<MealRoutes>('/:id', {
        preHandler: [
            authJwt
        ]
    }, async (req, res) => {
        const mealId = req.params.id

        try {
            const meal = await knex('meals')
                .select('*')
                .where('id', mealId)

            return res.status(200).send(meal)

        } catch (error) {
            console.error(error)
            return res.status(500).send("System error")
        } 
    })

    app.put<MealRoutes>('/editmeal/:id', {
        preHandler: [
            authJwt
        ]
    }, async (req, res) => {
        const mealId = req.params.id

        const editMealBodySchema = z.object({
            name: z.string(),
            description: z.string(),
            date_time: z.coerce.date(),
            is_on_diet: z.boolean()
        })

        const { name, description, date_time, is_on_diet } = editMealBodySchema.parse(req.body)

        try {

            const meal = await knex('meals')
                .where('id', mealId)
                .update({
                    name,
                      description,
                    date_time,
                    is_on_diet
                })

            if (meal === 0) {
                return res.status(400).send("Meal not found")
            }

            return res.status(200).send({message: "Meal updated successfully"})

        } catch (error) {
            console.error(error)
            return res.status(500).send("System error")
        }

    })

    app.delete<MealRoutes>('/deletemeal/:id', {
        preHandler: [
            authJwt
        ]
    }, async (req, res) => {
        const mealId = req.params.id

        try {
            await knex('meals')
                .where('id', mealId)
                .delete()
            
            return res.status(200).send('The meal was deleted successfully')

        } catch (error) {
            console.error(error)
            return res.status(500).send("System error")
        }
    })
} 