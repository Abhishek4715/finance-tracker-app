import express from "express";
import { fakeAuth } from "./middlewares/fakeAuth";
import { transactionRouter } from "./routes/transaction.routes";

const app = express();

app.use(express.json());
app.use("/api/transactions", fakeAuth, transactionRouter);

app.get('/', (req, res) => {
    res.send("<h1>This is Finance Tracker Home Page</h1>");
})

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        app.listen(port, () => console.log(`Server Started on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();

export default app;