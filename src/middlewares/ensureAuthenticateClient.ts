import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
require('dotenv').config({
    path: "../../.env"
})

interface IPayload {
    sub: string;
}


export async function ensureAuthenticateClient(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ message: "Token Missing", });
    }

    const [, token] = authHeader.split(" ");

    const secret = process.env.MD_CLIENT || "";


    try {
        //para forçar o tipo, para parar de dar o erro "string | null"
        const { sub } = verify(token, secret) as IPayload;

        request.id_client = sub;

        return next();
    } catch (err) {
        return response.status(400).json({ message: "Invalid token!" });
    }
}