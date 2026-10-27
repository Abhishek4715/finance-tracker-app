import { response, type Request, type Response } from "express";
import { prisma } from "../../prisma/lib/prisma";
import type { createInput, updateInput } from "../types/category";

// Find Category List
// Service
export async function findCategoryListService(userId: string, take = 20, skip = 0) {
    return await prisma.category.findMany({
        where: { userId },
        take: Math.min(take, 100),
        skip,
    })
}


// Controller
export async function findCategoryListController(req: Request, res: Response) {
    const userId = req.user.id;
    // const take = req.query.take || 20;
    // const skip = req.query.skip || 0;

    // Zod valid query.take and query.skip but in absence of if I have to validate both are number only
    const take = Math.max(1, Math.min(Number(req.query.take) || 20, 100));
    const skip = Math.max(0, Number(req.query.skip) || 0);

    res.status(200).json(await findCategoryListService(userId, take, skip))
}



// Find one Category
// Service
export async function findOneCategoryService(id: string, userId: string) {
    const category = await prisma.category.findFirst({
        where: { id, userId }
    });
    if (!category) throw new Error("Can not found the category");
    return category;
}

// Controller
export async function findOneCategoryController(req: Request, res: Response) {
    const {id} = req.params;
    const userId = req.user.id;

    if(typeof id !== "string") {
        res.status(400).json({error: "Invalid Category ID"})
        return;
    }
    res.status(200).json(await findOneCategoryService(id, userId))
}

// Create Category
// Service
export async function createCategoryService(userId: string, body: createInput) {
    return prisma.category.create({ data: { ...body, userId } })
}

export async function createCategoryController(req: Request, res: Response) {
    const userId = req.user.id;
    const body = req.body;
    res.status(201).json(await createCategoryService(userId, body));
}

// Update Category
// Service
export async function updateCategoryService(id: string, userId: string, data: updateInput) {
    const category = await prisma.category.findFirst({
        where: { id, userId }
    })
    if(!category) throw new Error("No Category Exist");
    return prisma.category.update({
        where: {id, userId},
        data
    })
}

// Controller
export async function updateCategoryController(req: Request, res: Response) {
    const {id} = req.params;
    const userId = req.user.id;
    const data = req.body;

    if (typeof id !== "string") {
        res.status(400).json({ error: "Invalid Category ID" });
        return;
    }

    res.status(200).json(await updateCategoryService(id, userId, data))
}



// Delete Category
// Service
export async function deleteCategoryService(id: string, userId: string) {
    const category = await prisma.category.findFirst({
        where: {id, userId}
    })
    if(!category) throw new Error("Category doesn't exist");
    return prisma.category.delete({
        where: {id, userId}
    })
}

// Controller
export async function deleteCategoryController(req: Request, res: Response) {
    const {id} = req.params;
    const userId = req.user.id;

    if (typeof id !== "string") {
        res.status(400).json({ error: "Invalid Category ID" });
        return;
    }
    await deleteCategoryService(id, userId);
    res.status(204).send();
}
