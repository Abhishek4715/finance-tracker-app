import express from "express";
import { findCategoryListController, findOneCategoryController, createCategoryController, updateCategoryController, deleteCategoryController } from "../controllers/category.controller";

export const categoryRouter = express.Router();

categoryRouter.route('/').get(findCategoryListController).post(createCategoryController);
categoryRouter.route('/:id').get(findOneCategoryController).patch(updateCategoryController).delete(deleteCategoryController);