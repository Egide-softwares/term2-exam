import { User } from "@prisma/client";
import "express";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      authentication?: JwtPayload;
	  user?: User | null
    }
  }
}