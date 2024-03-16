import { IRequest } from "../types";
import { OrderModel } from "../models/order.model";
import { Response } from "express";

export const checkout = async (req: IRequest, res: Response) => {
	//TODO: calculate the total price of the order
	const newOrder = new OrderModel({
		client: req.user,
		products: req.body.products,
		total: req.body.total,
	});
	try {
		const order = await newOrder.save();
		return res.status(201).json(order);
	} catch (err) {
		return res.status(500).json(err);
	}
};
