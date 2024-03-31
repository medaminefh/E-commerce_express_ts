
//import package
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import ProductModel from "../models/product.model";

try {
    mongoose.set("strictQuery", true);
	// DB connection
	mongoose.connect(process.env.MONGODB_URI!);
    
	mongoose.connection.on("connected", async () => {
        console.log("DB connected");
        
        // update all products with deleted false and published true
        await ProductModel.updateMany(
            { deleted: false, published: false },
            { published: true }
        );
        console.log("Products updated");

		process.exit(0);
	});

	mongoose.connection.on("error", (err: Error) => {
		console.log("DB failed with err - ", err);
		process.exit(1);
	});
} catch (error) {
	console.log("There is an error with the database connection");
}
