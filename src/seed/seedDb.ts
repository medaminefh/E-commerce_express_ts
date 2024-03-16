//import package
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import UserModel from "../models/user.model";
try {
	mongoose.set("strictQuery", true);
	// DB connection
	mongoose.connect(process.env.MONGODB_URI!);

	mongoose.connection.on("connected", async () => {
		console.log("DB connected");
		// create the admin user
		const admin = new UserModel({
			email: "root@gmail.com",
			password: process.env.ADMIN_PASS,
			role: "admin",
		});
		const user = new UserModel({
			email: "user@gmail.com",
			password: process.env.USER_PASS,
			role: "user",
		});
		await admin.save();
		console.log("Admin created");
		await user.save();
		console.log("User created");
	});

	mongoose.connection.on("error", (err: Error) => {
		console.log("DB failed with err - ", err);
		process.exit(1);
	});
} catch (error) {
	console.log("There is an error with the database connection");
}
