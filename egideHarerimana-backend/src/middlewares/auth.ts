import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { prisma } from "../db/prisma";

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers.authorization || req.headers.authorization.split(" ")[0] !== "Bearer") {
		return res.status(401).send({
			status: 401,
			message: "Unauthorised"
		});
	}

	try {
		let token_contents = verify(req.headers.authorization.split(" ")[1], process.env.JWT_SECRET as string);

		if (!token_contents || typeof token_contents !=="object") return res.status(401).send({
			status: 401,
			message: "Unauthorised"
		});

		const user = await prisma.user.findUnique({
			where: {
				id: token_contents.userId
			}
		});

		if(!user) return res.status(401).send({
			status: 401,
			message: "Unauthorised"
		});

		req.authentication = token_contents as JwtPayload;
		req.user = user;

		return next();
	} catch (error) {
		return res.status(401).send({
			status: 401,
			message: "something went wrong or Unauthorised"
		});
	}
}