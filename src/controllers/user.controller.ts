import { IRequest } from "@/types";
import {UserModel} from "../models/user.model";
import { Request, Response } from "express";

export const getUsers = async (_: Request, res: Response) => {
	try {
		// get all users without their passwords (with the select method)
		const users = await UserModel.find();
		return res.status(200).json(users);
	} catch (err) {
		return res.status(500).json(err);
	}
};

export const getUser = async (req: Request, res: Response) => {
	const id = req.params.userId;
	try {
		const user = await UserModel.findById(id).select("-password");
		return res.status(200).json(user);
	} catch (err) {
		return res.status(500).json(err);
	}
};

export const getCurrentUser = async(req: IRequest, res: Response) => {
	return req.user ? res.status(200).json(req.user) : res.status(404).json({ status: "User not found" });
}

export const deleteUser = async (req: Request, res: Response) => {
	const id = req.params.userId;
	try {
		const user = await UserModel.findByIdAndDelete(id);
		return res.status(200).json(user);
	} catch (err) {
		return res.status(500).json(err);
	}
};

export const updateUser = async (req: Request, res: Response) => {
	const id = req.params.userId;
	try {
		const user = await UserModel.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		return res.status(200).json(user);
	} catch (err) {
		return res.status(500).json(err);
	}
};
