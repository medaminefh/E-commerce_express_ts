import bcrypt from "bcryptjs";
import {UserModel} from "../models/user.model";
import jwt from "jsonwebtoken";
import { Response } from "express";
import type { IRequest } from "../types";

export const login = async (req: IRequest, res: Response) => {
	try {
		const user = await UserModel
			.findOne({ email: req.body!.email })
			.select("+password");

		if (!user) return res.status(401).json({ status: "wrong email" });

		const validPass = await bcrypt.compare(req.body!.password, user.password!);

		if (!validPass) return res.status(401).json({ status: "wrong pass" });
		const token = jwt.sign(
			{
				email: user.email,
			},
			process.env.TOKEN_SECRET!,
			{ expiresIn: "2d" }
		);

		return res.status(200).json({ token, role: user.role });
	} catch (error: any) {
		return res.status(500).json(error);
	}
};

export const register = async (req: IRequest, res: Response) => {
	try {
		// check if the user exists
		const UserExist = await UserModel.findOne({ email: req.body!.email });
		console.log(req.body);
		if (UserExist) {
			console.log(UserExist);
			return res.status(500).json({ status: "User Already exist" });
		}

		// Generating the salt

		const newUser = new UserModel({
			fullName: req.body.fullName,
			email: req.body.email,
			address: req.body.address,
			city: req.body.city,
			zipCode: req.body.zipCode,
			phone: req.body.phone,
			country: req.body.country,
			password: req.body.password,
		});
		const savedUser = await newUser.save();

		return res.status(200).json(savedUser);
	} catch (error: any) {
		console.log({ error });
		return res.status(500).json(error);
	}
};
