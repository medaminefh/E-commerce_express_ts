import bcrypt from "bcryptjs";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import { Response } from "express";
import type { IRequest } from "../types";

export const login = async (req: IRequest, res: Response) => {
	try {
		const user = await userModel
			.findOne({ username: req.body!.username })
			.select("+password");

		if (!user) return res.status(401).json({ status: "wrong email" });

		const validPass = await bcrypt.compare(req.body!.password, user.password!);

		if (!validPass) return res.status(401).json({ status: "wrong pass" });
		const token = jwt.sign(
			{
				email: user.email,
				username: user.username,
			},
			process.env.TOKEN_SECRET!,
			{ expiresIn: "2d" }
		);
		req.user = user.id;

		return res.status(200).json({ token });
	} catch (error: any) {
		return res.status(500).json(error);
	}
};

export const register = async (req: IRequest, res: Response) => {
	try {
		// check if the user exists
		const UserExist = await userModel.findOne({ email: req.body!.email });

		if (UserExist)
			return res.status(500).json({ status: "User Already exist" });

		// Generating the salt

		const newUser = new userModel({
			username: req.body!.username,
			email: req.body!.email,
			password: req.body!.password,
			avatar: req.body!.avatar || "",
		});
		const savedUser = await newUser.save();

		return res.status(200).json(savedUser);
	} catch (error: any) {
		return res.status(500).json(error);
	}
};
