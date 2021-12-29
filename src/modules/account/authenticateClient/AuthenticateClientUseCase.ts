import { prisma } from "../../../database/prismaClient"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"


interface IAuthenticateClient {
    username: string;
    password: string;
    secret: string;
}

export class AuthenticateClientUseCase {
    async execute({ username, password, secret }: IAuthenticateClient) {
        //Receber username, password

        //Verificar se username esta cadastrado
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        })

        if (!client) {
            throw new Error("Username or password invalid!")
        }

        //verificar se senha corresponse ao username

        const passwordMatch = await compare(password, client.password);

        if (!passwordMatch) {
            throw new Error("Username or password invalid!")
        }


        //gerar o token
        const token = sign({ username }, secret, {
            subject: client.id,
            expiresIn: "5h"
        })

        return token
    }
}