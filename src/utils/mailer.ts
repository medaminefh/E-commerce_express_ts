import nodemailer from "nodemailer";
import logger from "./logger";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
	service: "Gmail",
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: process.env.email,
		pass: process.env.email_pass,
	},
});

const emails = [
	process.env.clientEmail as string,
	process.env.adminEmail as string,
];

export const sendMail = async (_: string[], subject: string, html: string) => {
	const mailOptions = {
		from: {
			name: "Mercerie Maryouma",
			address: process.env.email as string,
		},
		to: emails,
		subject,
		text: "Mercerie Maryouma",
		html,
	};
	transporter.sendMail(mailOptions, function (err, info) {
		if (err) {
			logger.error(err.message);
			return false;
		} else {
			logger.info(info.response);
			return true;
		}
	});
};
