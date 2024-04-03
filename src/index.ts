//import package
import dotenv from "dotenv";

import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import path from "path";

dotenv.config();
const app = express();
app.use(cors());

app.use(express.static(path.resolve(__dirname, "invoices")));

//db connection
import "./db/connect";

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

//import routes
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import checkoutRoutes from "./routes/checkout.routes";

//routes middleware
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/auth", authRoutes);

//server listen
const port: string = process.env.PORT || "5555";
app.listen(port, () => {
	console.log(`server yemchi jawou mezyan 3al port http://localhost:${port}`);
});
