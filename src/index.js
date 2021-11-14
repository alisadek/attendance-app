const express = require("express");
const cors = require("cors");

const dbOperations = require("./api/services/dboperations");
const location = require("./api/models/Location");
const shift = require("./api/models/Shift");

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api", router);

router.use((request, response, next) => {
	console.log("middleware");
	next();
});

router.route("/locations").get((request, response) => {
	dbOperations.getLocations().then((result) => {
		response.json(result[0]);
	});
});
router.route("/locations").post((request, response) => {
	let location = { ...request.body };
	dbOperations.addLocation(location).then((result) => {
		response.status(201).json(result[0]);
	});
});
router.route("/locations/:id").get((request, response) => {
	dbOperations.getLocation(request.params.id).then((result) => {
		response.json(result[0]);
	});
});

router.route("/shifts").get((request, response) => {
	dbOperations.getShifts().then((result) => {
		response.json(result);
	});
});
router.route("/shifts/:id").get((request, response) => {
	dbOperations.getShift(request.params.id).then((result) => {
		response.json(result[0]);
	});
});
router
	.route("/attendance-records/:UserId/:DateTime")
	.get((request, response) => {
		dbOperations
			.getAttendanceRecord(request.params.UserId, request.params.DateTime)
			.then((result) => {
				response.json(result[0]);
			});
	});

router.route("/shifts").post((request, response) => {
	let shift = { ...request.body };
	dbOperations.addShift(shift).then((result) => {
		response.status(201).json(result);
	});
});

router.route("/punch-in").post((request, response) => {
	let attRecord = { ...request.body };
	dbOperations.addAttendanceRecord(attRecord).then((result) => {
		response.status(201).json(result);
	});
});
router.route("/assign-users").post((request, response) => {
	let record = { ...request.body };
	dbOperations.assignUserToShift(record).then((result) => {
		response.status(201).json(result);
	});
});

app.listen(3001, () => {
	console.log("server running on port 3001");
});
