import "knex";

declare module 'knex/types/tables' {
    export interface Tables {
        users: {
            id: string
            name: string
            email: string
            password_hash: string
        },

        meals: {
            id: string
            user_id: string
            name: string
            description: string
            date_time: Date
            is_on_diet: boolean
        }
    }
}

interface JWTUser {
    id: string
    email: string
    iat: number
    exp: number
}

declare module 'fastify' {
    interface FastifyRequest {
        user?: JWTUser
    }
}