import fastify from 'fastify'
import { usersRoutes } from './routes/usersRoutes.js'

export const app = fastify()

app.register(usersRoutes, {
    prefix: 'users'
})