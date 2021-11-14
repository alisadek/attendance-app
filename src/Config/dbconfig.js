const config = {
	server: "localhost\\ATTENDANCEAPP",
	port: 1433,
	user: "alisadek",
	password: "attendance123",
	database: "attendanceapp",
	options: {
		trustedConnection: true,
		enableArithAbort: true,
		instanceName: "ATTENDANCEAPP",
		trustServerCertificate: true,
	},
	connectionTimeout: 150000,
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000,
	},
};

module.exports = config;
