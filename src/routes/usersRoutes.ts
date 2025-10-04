import type { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { knex } from "../database.js";
import bcrypt from "bcrypt"

export async function usersRoutes(app:FastifyInstance) {
    app.post('/createuser', async (req, res) => {
        
        const createUserBodySchema = z.object({
            name: z.string(),
            email: z.string(),
            password: z.string(),
            confirmPassword: z.string()
        })

        const { name, email, password, confirmPassword } = createUserBodySchema.parse(req.body)

        if (confirmPassword !== password) {
            return res.status(422).send("Passwords must be the same.")
        }

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)
        
        await knex('users')
        .insert({
            id: randomUUID(),
            name,
            email,
            password_hash: passwordHash
        })
        
        return res.status(201).send("User created successfully")
    })
} 