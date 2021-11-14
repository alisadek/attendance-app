const dbOperations= require("../services/dboperations");
const officeLocation = require("../models/Location");

dbOperations.getOfficeLocation().then(result =>{
    console.log(result);
})

