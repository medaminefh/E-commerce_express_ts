// connect to the database
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

try {
	mongoose.set("strictQuery", true);
	// DB connection
	mongoose.connect(process.env.MONGODB_URI!);

	mongoose.connection.on("connected", () => {
		console.log("DB connected");
	});

	mongoose.connection.on("error", (err: Error) => {
		console.log("DB failed with err - ", err);
	});
} catch (error) {
	console.log("There is an error with the database connection");
}
