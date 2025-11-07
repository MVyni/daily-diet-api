import type { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { knex } from "../database.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { env } from "../../env/index.js";
import { authJwt } from "../configs/getToken.js";

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

    app.post('/login', async (req, res) => {

        const createLoginBodySchema = z.object({
            email: z.string(),
            password_hash: z.string(),
        })

        const { email, password_hash } = createLoginBodySchema.parse(req.body)

        const user = await knex('users')
            .where('email', email)
            .first()

        const checkPassword = await bcrypt.compare(password_hash, user.password_hash)
        
        if (user.email !== email || !checkPassword ) {
            return res.status(401).send("Email and/or password invalid")
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, env.SECRET_JWT, { expiresIn: "1D"})
        
        return { token }
    })

    app.get('/', {
        preHandler: [
            authJwt
        ]
    }, async (req, res) => {
        const users = await knex('users').select('*')

        return users
    })
}
