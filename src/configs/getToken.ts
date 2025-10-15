import type { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { env } from "../../env/index.js";
import type { JWTUser } from "../@types/knex.js";

export async function authJwt(req: FastifyRequest, res: FastifyReply) {
    
    try {
        const authHeader = req.headers.authorization
    
        if (!authHeader) {
            return res.status(401).send("Token not provided")
        }
    
        const [bearer, token] = authHeader.split(' ')

        if (bearer !== "Bearer" || !token) {
            return res.status(401).send("Invalid token format")
        }
        
        const decodedJwt = jwt.verify(token, env.SECRET_JWT) as JWTUser
        req.user = decodedJwt

    } catch (error) {
        res.status(401).send("Token invalid")
    }
}