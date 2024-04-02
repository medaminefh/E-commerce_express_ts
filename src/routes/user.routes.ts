import express, { Request, Response, NextFunction } from "express";

import {
	getUser,
	getUsers,
	deleteUser,
	updateUser,
	getCurrentUser,
} from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";

const router = express.Router();

router.get(
	"/",
	auth as unknown as (req: Request, res: Response, next: NextFunction) => void,
	getUsers
);

router.get(
	"/current",
	auth as unknown as (req: Request, res: Response, next: NextFunction) => void,
	getCurrentUser as unknown as (req: Request, res: Response) => void
);

router.get(
	"/:userId",
	auth as unknown as (req: Request, res: Response, next: NextFunction) => void,
	getUser
);


router.put(
	"/:userId",
	auth as unknown as (req: Request, res: Response, next: NextFunction) => void,
	updateUser
);
router.delete(
	"/:userId",
	auth as unknown as (req: Request, res: Response, next: NextFunction) => void,
	deleteUser
);

export default router;
