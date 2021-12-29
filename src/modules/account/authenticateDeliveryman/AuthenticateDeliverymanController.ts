import { Request, Response } from "express";
import { AuthenticateDeliverymanUseCase } from "./AuthenticateDeliverymanUseCase";
require('dotenv').config({
    path: "../../../../.env"
})

export class AuthenticateDeliverymanController {
    async handle(request: Request, response: Response) {

        const { username, password } = request.body;

        const secret = process.env.MD_DELIVERYMAN

        const authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase();

        if (!secret) {
            throw new Error("Secret Missing")
        }

        const result = await authenticateDeliverymanUseCase.execute({ username, password, secret })

        return response.json(result);
    }
}