import { config } from "dotenv";
import express, { Request, Response } from "express";
import { prisma } from "./db/prisma";
import { transactionsRouter } from "./routes/transactions";
import { usersRouter } from "./routes/users";

const app = express()

config()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("", (req: Request, res: Response)=> {
	return res.status(200).send({
		author: "Harerimana Egide <egideharerimana085@gmail.com>",
		status: "RUNNING",
		message: "SERVER IS RUNNING"
	})
});

app.use("/api/users", usersRouter);
app.use("/api/transactions", transactionsRouter);

app.listen(5000, ()=> console.log(`SERVER STARTED ON PORT ${5000}`));

app.on("close", async ()=> {
	await prisma.$disconnect()
});