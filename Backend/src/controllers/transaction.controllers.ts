import type { Request, Response } from "express";
import { prisma } from "../../prisma/lib/prisma";
import type { createInput, updateInput } from "../types/transaction";

// Find Transaction List
// Service
export async function findTransactionListService(userId: string, take = 20, skip = 0) {
    return await prisma.transaction.findMany({
        where: { userId },
        take: Math.min(take, 100),
        skip,
    })
}

// Controller
export async function findTransactionListController(req: Request, res: Response) {
    // const take = req.query.take || 20;
    // const skip = req.query.skip || 0;
    const id = req.user.id;

    // Zod valid query.take and query.skip but in absence of if I have to validate both are number only
    const take = Math.max(1, Math.min(Number(req.query.take) || 20, 100));
    const skip = Math.max(0, Number(req.query.skip) || 0);

    res.status(200).json(await findTransactionListService(id, take, skip));
}



// Find one Transaction
// Service
export async function findOneTransactionService(id: string, userId: string) {
    const transaction = await prisma.transaction.findFirst({
        where: { id, userId }
    })
    if (!transaction) throw new Error("Can not found the transaction");
    return transaction;
}

// Controller
export async function findOneTransactionController(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user.id;

    if (typeof id !== "string") {
        res.status(400).json({ error: "Invalid transaction ID" });
        return;
    }
    res.status(200).json(await findOneTransactionService(id, userId));
}

// Create Transaction List
// Service
export async function createTransactionService(userId: string, data: createInput) {
    const category = await prisma.category.findFirst({
        where: { id: data.categoryId, userId }
    })
    if (!category) throw new Error("Category Not found");
    return prisma.transaction.create({ data: { ...data, userId } });
}

// Controller
export async function createTransactionsController(req: Request, res: Response) {
    const userId = req.user.id;
    const body = req.body;
    res.status(201).json(await createTransactionService(userId, body));
}


// Update Transaction
// Service
export async function updateTransactionService(id: string, userId: string, data: updateInput) {
    const user = await prisma.transaction.findFirst({
        where: { id, userId }
    })
    if (!user) throw new Error("No Transaction exist");
    return prisma.transaction.update({
        where: { id, userId },
        data
    })
}

// Controller
export async function updateTransactionController(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user.id;
    const body = req.body;

    if (typeof id !== "string") {
        res.status(400).json({ error: "Invalid transaction ID" });
        return;
    }
    res.status(200).json(await updateTransactionService(id, userId, body));
}


// Delete Transaction
// Service
export async function deleteTransactionService(id: string, userId: string) {
    const transaction = await prisma.transaction.findFirst({
        where: { id, userId }
    })
    if (!transaction) throw new Error("Transaction doesn't exist");
    return prisma.transaction.delete({
        where: { id, userId }
    })
}

// Controller
export async function deleteTransactionController(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user.id;

    if (typeof id !== "string") {
        res.status(400).json({ error: "Invalid transaction ID" });
        return;
    }
    await deleteTransactionService(id, userId);
    res.status(204).send();
}