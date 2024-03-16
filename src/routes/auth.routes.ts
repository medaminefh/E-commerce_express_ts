import express from "express";
import { Request, Response } from "express";
import { register, login } from "../controllers/auth.controller";

const router = express.Router();

router.post(
	"/register",
	register as unknown as (req: Request, res: Response) => void
);
router.post(
	"/login",
	login as unknown as (req: Request, res: Response) => void
);

export default router;
