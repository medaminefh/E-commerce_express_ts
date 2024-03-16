import Winston from "winston";

export default Winston.createLogger({
	transports: new Winston.transports.File({
		filename: "logs/server.log",
		format: Winston.format.combine(
			Winston.format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
			Winston.format.align(),
			Winston.format.printf(
				(info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
			)
		),
	}),
});
