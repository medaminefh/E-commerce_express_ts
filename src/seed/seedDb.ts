//import package
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import ProductModel from "../models/product.model";
import UserModel from "../models/user.model";

const fetchProducts = async () => {
	const data = await fetch("http://localhost:3000/api/products");
	return await data.json();
};

const createInitialUsers = async () => {
	try {
		const rootExists = UserModel.findOne({ email: "root@gmail.com" });
		if (!rootExists) {
			// create the admin user
			const admin = new UserModel({
				email: "root@gmail.com",
				fullName: "root",
				password: process.env.ADMIN_PASS,
				role: "admin",
			});
			await admin.save();
			console.log("Admin created");
		}
		const userExists = UserModel.findOne({ username: "user@gmail.com" });
		if (!userExists) {
			// create the user
			const user = new UserModel({
				email: "user@gmail.com",
				fullName: "user",
				password: process.env.USER_PASS,
				role: "user",
			});

			await user.save();
			console.log("User created");
		}
	} catch (error) {
		console.log("Error creating the users", error);
	}
};
try {
	mongoose.set("strictQuery", true);
	// DB connection
	mongoose.connect(process.env.MONGODB_URI!);

	mongoose.connection.on("connected", async () => {
		console.log("DB connected");

		// creating users
		await createInitialUsers();

		// create the products
		const products = await fetchProducts();
		const insertedProducts = await ProductModel.insertMany(products);
		console.log("Products created", insertedProducts);
		process.exit(0);
	});

	mongoose.connection.on("error", (err: Error) => {
		console.log("DB failed with err - ", err);
		process.exit(1);
	});
} catch (error) {
	console.log("There is an error with the database connection");
}
