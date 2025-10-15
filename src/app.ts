import fastify from 'fastify'
import { usersRoutes } from './routes/usersRoutes.js'
import { mealsRoutes } from './routes/mealsRoutes.js'

export const app = fastify()

app.register(usersRoutes, {
    prefix: 'users'
})

app.register(mealsRoutes, {
    prefix: 'meals'
})