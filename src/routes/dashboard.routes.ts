import { auth } from "../middlewares/auth.middleware";
import { dashboard } from "../controllers/dashboard.controller";
import express, { Request, Response } from "express";
const router = express.Router();

router.get(
	"/",
	auth as unknown as (req: Request, res: Response) => void,
	dashboard
);

export default router;
