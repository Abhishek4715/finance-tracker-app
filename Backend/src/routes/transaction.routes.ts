import express from "express";
import { findTransactionListController, findOneTransactionController, createTransactionsController, updateTransactionController, deleteTransactionController } from "../controllers/transaction.controllers";

export const transactionRouter = express.Router();

transactionRouter.route('/').get(findTransactionListController).post(createTransactionsController);
transactionRouter.route('/:id').get(findOneTransactionController).patch(updateTransactionController).delete(deleteTransactionController);

