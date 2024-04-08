import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
	client: string;
	orderId: string;
	products: [];
	total: number;
	createdAt: Date;
}

const OrderSchema: Schema = new Schema({
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Client",
		required: true,
	},
	products: [
		{
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
			},
			quantity: { type: Number },
		},
	],
	orderId: { type: String, required: false, unique: true },
	shipping: { type: Number, required: true, default: 8 },
	subTotal: { type: Number, required: true },
	total: { type: Number, required: true },
	createdAt: { type: Date, default: Date.now },
});

//generate an orderId based on the total number of orders
OrderSchema.pre("save", async function (next) {
	const order = this as IOrder;
	const count = await OrderModel.countDocuments();
	order.orderId = "00000" + (count + 1).toString().slice(-6);
	next();
});
const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);

export { OrderModel, IOrder };
