import userModel from "../models/user.model";
import { Request, Response } from "express";

export const getUsers = async (_: Request, res: Response) => {
	try {
		// get all users without their passwords (with the select method)
		const users = await userModel.find();
		return res.status(200).json(users);
	} catch (err) {
		return res.status(500).json(err);
	}
};

export const getUser = async (req: Request, res: Response) => {
	const id = req.params.userId;
	try {
		const user = await userModel.findById(id).select("-password");
		return res.status(200).json(user);
	} catch (err) {
		return res.status(500).json(err);
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	const id = req.params.userId;
	try {
		const user = await userModel.findByIdAndDelete(id);
		return res.status(200).json(user);
	} catch (err) {
		return res.status(500).json(err);
	}
};

export const updateUser = async (req: Request, res: Response) => {
	const id = req.params.userId;
	try {
		const user = await userModel.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		return res.status(200).json(user);
	} catch (err) {
		return res.status(500).json(err);
	}
};
