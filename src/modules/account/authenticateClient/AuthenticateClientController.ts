import { Request, Response } from "express";
import { AuthenticateClientUseCase } from "./AuthenticateClientUseCase";
require('dotenv').config({
    path: "../../../../.env"
})

export class AuthenticateClientController {
    async handle(request: Request, response: Response) {

        const { username, password } = request.body;

        const secret = process.env.MD_CLIENT

        const authenticateClientUseCase = new AuthenticateClientUseCase();

        if (!secret) {
            throw new Error("Secret Missing")
        }

        const result = await authenticateClientUseCase.execute({ username, password, secret })

        return response.json(result);
    }
}