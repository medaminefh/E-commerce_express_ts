import express from "express";
import { Request, Response } from "express";
import {
	getOrders,
    getOrder,
} from "../controllers/order.controller";

const router = express.Router();

router.get(
	"/",
	getOrders as unknown as (req: Request, res: Response) => void
);

router.get(
	"/:orderId",
	getOrder as unknown as (req: Request, res: Response) => void
);

export default router;
