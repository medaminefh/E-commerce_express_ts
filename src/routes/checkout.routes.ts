import { checkout } from "../controllers/checkout.controller";
import express from "express";

const router = express.Router();

router.post(
	"/",
	checkout as unknown as (req: express.Request, res: express.Response) => void
);
export default router;
