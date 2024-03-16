import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		defaultPrice: { type: Number, required: true },
		discount: {
			type: Boolean,
			required: false,
			default: false,
		},
		priceAfterDiscount: {
			type: Number,
			required: false,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		description: { type: String },
		images: {
			type: [String],
			required: false,
		},
		defaultImage: {
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
