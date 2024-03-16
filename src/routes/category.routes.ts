import express, { NextFunction, Request, Response } from "express";
import {
	createCategory,
	getCategories,
	getCategory,
	deleteCategory,
	updateCategory,
} from "../controllers/category.controller";
import { auth } from "../middlewares/auth.middleware";

const router = express.Router();

router.post(
	"/",
	auth as unknown as (req: Request, res: Response, next: NextFunction) => void,
	createCategory
);
router.get("/", getCategories);
router.get("/:categoryName", getCategory);
router.delete(
	"/:categoryId",
	auth as unknown as (req: Request, res: Response, next: NextFunction) => void,
	deleteCategory
);
router.put(
	"/:categoryName",
	auth as unknown as (req: Request, res: Response, next: NextFunction) => void,
	updateCategory
);

export default router;
