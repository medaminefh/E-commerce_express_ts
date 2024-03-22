import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		price: { type: Number, required: true },
		discount: {
			type: Boolean,
			required: false,
			default: false,
		},
		discountValue: {
			type: Number,
			required: false,
		},
		priceAfterDiscount: {
			type: Number,
			required: false,
		},
		description: { type: String },
		images: {
			type: [String],
			required: false,
		},
		image: {
			type: String,
			required: true,
		},
		published: {
			type: Boolean,
			required: true,
			default: false,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: false,
		},
		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: false,
		},
		deletedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: false,
		},
		deletedAt: {
			type: Date,
			required: false,
		},
		deleted: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
