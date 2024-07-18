import ProductModel from "../models/product.model";
import { OrderModel } from "../models/order.model";
import { Request, Response } from "express";
import { UserModel } from "../models/user.model";

export const dashboard = async (_: Request, res: Response) => {
	try {
		const users = await UserModel.countDocuments();
		const products = await ProductModel.countDocuments();
		const orders = await OrderModel.countDocuments();
		res.json({ users, products, orders });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server error" });
	}
};
