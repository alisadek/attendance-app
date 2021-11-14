const config = require("../../Config/dbconfig");
const sql = require("mssql");

async function getLocations() {
	try {
		let pool = await sql.connect(config);
		let locations = pool.request().query("SELECT * from Locations");
		return (await locations).recordsets;
	} catch (error) {
		console.log(error);
	}
}

async function getLocation(locationId) {
	try {
		let pool = await sql.connect(config);
		let location = await pool
			.request()
			.input("input_parameter", sql.Int, locationId)
			.query("SELECT * from locations where Id = @input_parameter");
		return (await location).recordsets;
	} catch (error) {
		console.log(error);
	}
}

async function addLocation(location) {
	try {
		let pool = await sql.connect(config);
		let insertLocation = await pool
			.request()
			.input("Title", sql.VarChar(50), location.Title)
			.input("Lat", sql.Decimal(12, 9), location.Lat)
			.input("Lng", sql.Decimal(12, 9), location.Lng)
			.input("Radius", sql.Int, location.Radius)
			.execute("InsertLocation");

		return insertLocation.recordsets;
	} catch (error) {
		console.log(error);
	}
}

async function getShift(shiftId) {
	try {
		let pool = await sql.connect(config);
		let shift = await pool
			.request()
			.input("input_parameter", sql.Int, shiftId)
			.query("SELECT * from Shifts where Id = @input_parameter");
		return (await shift).recordsets;
	} catch (error) {
		console.log(error);
	}
}
async function getAttendanceRecord(userId, date) {
	try {
		let pool = await sql.connect(config);
		let record = await pool
			.request()
			.input("userId", sql.VarChar(50), userId)
			.input("date", sql.Date, date)
			.query(
				"SELECT * from AttendanceRecords where UserId = @userId AND CAST(PunchInDateTime AS Date)= @date",
			);
		console.log("record");
		return (await record).recordsets;
	} catch (error) {
		console.log(error);
	}
}

async function getShifts() {
	try {
		let pool = await sql.connect(config);
		let shifts = pool.request().query("SELECT * from Shifts");
		return (await shifts).recordsets[0];
	} catch (error) {
		console.log(error);
	}
}

async function addShift(shift) {
	try {
		let pool = await sql.connect(config);
		let insertShift = await pool
			.request()
			.input("Title", sql.VarChar(50), shift.Title)
			.input("StartTime", sql.Time(7), shift.StartTime)
			.input("EndTime", sql.Time(7), shift.EndTime)
			.execute("InsertShifts");

		return insertShift.recordsets;
	} catch (error) {
		console.log(error);
	}
}

async function addAttendanceRecord(record) {
	try {
		let pool = await sql.connect(config);
		let insertRecord = await pool
			.request()
			.input("UserId", sql.VarChar(50), record.UserId)
			.input("PunchInDateTime", sql.DateTime, record.PunchInDateTime)
			.input("PunchOutDateTime", sql.DateTime, record.PunchOutDateTime)
			.input("LocationId", sql.Int, record.LocationId)
			.execute("InsertAttendanceRecord");
		return insertRecord.recordsets;
	} catch (error) {
		console.log(error);
	}
}
async function assignUserToShift(record) {
	try {
		let pool = await sql.connect(config);
		let insertRecord = await pool
			.request()
			.input("UserId", sql.VarChar(50), record.UserId)
			.input("ShiftId", sql.Int, record.ShiftId)
			.execute("InsertUsersShifts");
		return insertRecord.recordsets;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	getLocations,
	getLocation,
	getShift,
	getShifts,
	addLocation,
	addShift,
	addAttendanceRecord,
	assignUserToShift,
	getAttendanceRecord,
};
