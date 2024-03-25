import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true },
		password: { type: String, minlength: 8, required: true, select: false },
		email: {
			type: String,
			unique: true,
			index: true,
			lowercase: true,
			required: true,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		avatar: { type: String, default: "" },
		address: { type: String, required: true },
		phone: { type: String, required: true },
		city: { type: String, required: true },
		zipCode: { type: String, required: true },
		country: { type: String, required: true },
	},
	{ timestamps: true }
);

// hashing the password before saving it to the database
UserSchema.pre("save", async function (next) {
	const user = this as any;
	if (!user.isModified("password")) return next();
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(user.password, salt);
	user.password = hashedPassword;
	next();
});

export default mongoose.model("User", UserSchema);
