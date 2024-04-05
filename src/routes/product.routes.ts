import express from "express";
import { Request, Response } from "express";
import {
	createProduct,
	getProducts,
	getProduct,
	updateProduct,
	unpublishProducts,
	getProductsForAdmin,
} from "../controllers/product.controller";
import { auth } from "../middlewares/auth.middleware";

const router = express.Router();

router.post(
	"/",
	auth as unknown as (req: Request, res: Response) => void,
	createProduct as unknown as (req: Request, res: Response) => void
);
router.get(
	"/",
	getProducts as unknown as (req: Request, res: Response) => void
);

router.get(
	"/admin",
	auth as unknown as (req: Request, res: Response) => void,
	getProductsForAdmin as unknown as (req: Request, res: Response) => void
);

router.get(
	"/:productId",
	getProduct as unknown as (req: Request, res: Response) => void
);

router.put(
	"/:productId",
	auth as unknown as (req: Request, res: Response) => void,
	updateProduct as unknown as (req: Request, res: Response) => void
);
router.patch(
	"/unpublish",
	auth as unknown as (req: Request, res: Response) => void,
	unpublishProducts as unknown as (req: Request, res: Response) => void
);

export default router;
