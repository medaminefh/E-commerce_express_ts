import express from "express";
import { Request, Response } from "express";
import {
	createProduct,
	getProducts,
	getUndelitedProducts,
	getPublishedProducts,
	getProductsByCategory,
	getProduct,
	updateProduct,
	deleteProduct,
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
	"/undelited",
	getUndelitedProducts as unknown as (req: Request, res: Response) => void
);
router.get(
	"/published",
	getPublishedProducts as unknown as (req: Request, res: Response) => void
);
router.get(
	"/:productId",
	getProduct as unknown as (req: Request, res: Response) => void
);
router.get(
	"/:categoryId/bycategory",
	getProductsByCategory as unknown as (req: Request, res: Response) => void
);
router.put(
	"/:productId",
	auth as unknown as (req: Request, res: Response) => void,
	updateProduct as unknown as (req: Request, res: Response) => void
);
router.delete(
	"/:productId",
	auth as unknown as (req: Request, res: Response) => void,
	deleteProduct as unknown as (req: Request, res: Response) => void
);

export default router;
