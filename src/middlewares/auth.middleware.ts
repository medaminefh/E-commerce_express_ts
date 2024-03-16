// auth middleware

import { Response, NextFunction } from "express";
import { IRequest } from "../types";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";

export const auth = async (
	req: IRequest,
	res: Response,
	next: NextFunction
) => {
	const token = req.header("auth-token");
	if (!token) return res.status(401).json({ status: "Access Denied" });

	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET!);
		const user = await userModel.findOne({
			username: (verified as jwt.JwtPayload).username,
		});
		if (!user) return res.status(401).json({ status: "user not found" });
		next();
	} catch (err) {
		return res.status(500).json(err);
	}

	return; // Add this line to ensure all code paths return a value
};
