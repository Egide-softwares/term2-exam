import { compareSync, hashSync } from "bcrypt";
import { config } from "dotenv";
import { Request, Response, Router } from "express";
import { sign } from "jsonwebtoken";
import { prisma } from "../db/prisma";
import { isLoggedIn } from "../middlewares/auth";
import { newUserSchema, userLoginSchema } from "../validations/schemas";

config();

export const usersRouter = Router();

usersRouter.get("", isLoggedIn ,async (req: Request, res: Response) => {
	const allUsers = await prisma.user.findMany({
		include: {
			tokens: true,
			transactions: true,
		}
	});
	return res.status(200).send({
		status: 200,
		message: "success",
		data: {
			users: allUsers
		}
	})
});

usersRouter.post("/newAccount", async (req: Request, res: Response) => {
	const validations = newUserSchema.validate(req.body);
	if (validations.error) return res.status(400).send({
		status: 400,
		message: validations.error.details[0].message
	});

	const existingUser = await prisma.user.findFirst({
		where: {
		  OR: [
			{ email: req.body.email },
			{ nid: req.body.nid },
			{ meterNumber: req.body.meterNumber }
		  ]
		}
	  });

	if(existingUser) return res.status(201).send({
		status: 400,
		message: "Email or National id already taken"
	});

	const hashedPassword = hashSync(req.body.password, 10);

	const user = await prisma.user.create({
		data: {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			nid: req.body.nid,
			meterNumber: req.body.meterNumber,
			password: hashedPassword,
			createdAt: new Date(Date.now()),
			updatedAt: new Date(Date.now())
		},
	});

	if (!user) {
		return res.status(500).send({
			status: 500,
			message: "something went wrong"
		});
	}
	return res.status(201).send({
		status: 201,
		message: "created",
		data: {
			user: user
		}
	});
});

usersRouter.post("/userLogin", async (req: Request, res: Response)=> {
	const validations = userLoginSchema.validate(req.body);
	if (validations.error) return res.status(400).send({
		status: 400,
		message: validations.error.details[0].message
	});

	const user = await prisma.user.findFirst({
		where: { email: req.body.email }
	});

	if(!user) return res.status(400).send({
		status: 400,
		message: "Invalid email or password"
	});

	if(!compareSync(req.body.password, user.password)) return res.status(400).send({
		status: 400,
		message: "Invalid email or password"
	});

	const token = sign({
		userId: user.id, 
		userNid: user.nid, 
		meterNumber: user.meterNumber,
		signed: new Date(Date.now())
	}, process.env.JWT_SECRET as string);

	return res.status(200).send({
		status: 200,
		message: "Logged in successfully",
		data: {
			token: token
		}
	});
});