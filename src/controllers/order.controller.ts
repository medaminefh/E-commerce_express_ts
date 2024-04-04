import { IRequest } from "../types";
import {OrderModel} from "../models/order.model";
import { Response } from "express";

export const getOrders = async (_: IRequest, res: Response) => {
	try {
        // aggregate the products field in the order collection

        //const orders = await OrderModel.find()
        const orders = await OrderModel.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "client",
                    foreignField: "_id",
                    as: "client",
                },
            },
            {
				$project: {
					client: {
						password: 0,
						__v: 0,
						_id: 0,
					},
				},
			},
/*             {
                $unwind: "$productDetails"
            },
            {
                $group: {
                    _id: "$_id",
                    client: { $first: "$client" },
                    products: {
                        $push: {
                            id: "$products.id",
                            quantity: "$products.quantity",
                            productDetails: "$productDetails"
                        }
                    },
                    shipping: { $first: "$shipping" },
                    subTotal: { $first: "$subTotal" },
                    total: { $first: "$total" },
                    createdAt: { $first: "$createdAt" },
                    orderId: { $first: "$orderId" },
                }
            } */
        ]);
        
		return res.status(200).json(orders);
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
