import { IRequest } from "../types";
import {OrderModel} from "../models/order.model";
import { Response } from "express";

export const getOrders = async (_: IRequest, res: Response) => {    
    try {
        const aggregatedOrders = await OrderModel.aggregate([
            { $unwind: "$products" },
            {
                $lookup: {
                    from: "users",
                    localField: "client",
                    foreignField: "_id",
                    as: "client",
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "products.id",
                    foreignField: "_id",
                    as: "products.productDetails",
                },
            },

            { $unwind: "$products.productDetails" },
            { $unwind: "$client" },
            {
                $project: {
                    "client.password": 0
                }
            },
            {
                $group: {
                    _id: "$_id",
                    client: {$first:"$client"} ,
                    orderId: { $first: "$orderId" },
                    createdAt: {$first:"$createdAt"},
                    products: { $push: "$products" },
                    total: { $first: "$total" },
                    subTotal: { $first: "$subTotal" },
                    shipping: { $first: "$shipping" },
                },
            },

        ]);
		return res.status(200).json(aggregatedOrders);
	} catch (err) {
		return res.status(500).json(err);
	}
};

export const getOrder = async (req: IRequest, res: Response) => {
	const id = req.params.orderId;
	try {
		const order = await OrderModel.findById(id);

		return res.status(200).json(order);
	} catch (err) {
		return res.status(500).json(err);
	}
};
