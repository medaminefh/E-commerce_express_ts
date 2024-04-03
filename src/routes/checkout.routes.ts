import { auth } from "../middlewares/auth.middleware";
import { checkout } from "../controllers/checkout.controller";
import express, { Request, Response } from "express";

const router = express.Router();

router.post(
	"/",
	auth as unknown as (req: Request, res: Response) => void,
	checkout as unknown as (req: Request, res: Response) => void
);
export default router;
