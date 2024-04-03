import { IRequest } from "../types";
import { OrderModel } from "../models/order.model";
import { Response } from "express";

export const checkout = async (req: IRequest, res: Response) => {
	//TODO: calculate the total price of the order
	try {
	const newOrder = new OrderModel({
		client: req.user!._id,
		products: req.body.products,
		subTotal: req.body.subTotal,
		total: req.body.total,
	});
		const order = await newOrder.save();
		return res.status(201).json(order);
	} catch (err) {
		console.log({err})
		return res.status(500).json(err);
	}
};
