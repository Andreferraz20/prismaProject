import { prisma } from "../../../../database/prismaClient";

export class FindAllDeliveriesUseCase {
    async execute(id_client: string) {
        /*const deliveries = await prisma.deliveries.findMany({
            where: {
                id_client
            }
        }) forma 1

        const deliveries = await prisma.clients.findMany({
            where: {
                id: id_client
            },
            include: {
                deliveries: true
            }, forma 2
        })*/

        const deliveries = await prisma.clients.findMany({
            where: {
                id: id_client
            },
            select: {
                id: true,
                username: true,
                deliveries: true,
            },
        })

        return deliveries;
    }
}