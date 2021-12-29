import { prisma } from "../../../database/prismaClient"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"


interface IAuthenticateDeliveryman {
    username: string;
    password: string;
    secret: string;
}

export class AuthenticateDeliverymanUseCase {
    async execute({ username, password, secret }: IAuthenticateDeliveryman) {
        //Receber username, password

        //Verificar se username esta cadastrado
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        })

        if (!deliveryman) {
            throw new Error("Username or password invalid!")
        }

        //verificar se senha corresponse ao username

        const passwordMatch = await compare(password, deliveryman.password);

        if (!passwordMatch) {
            throw new Error("Username or password invalid!")
        }


        //gerar o token
        const token = sign({ username }, secret, {
            subject: deliveryman.id,
            expiresIn: "5h"
        })

        return token
    }
}