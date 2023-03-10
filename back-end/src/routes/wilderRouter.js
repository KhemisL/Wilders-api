const express = require("express");
const router = express.Router()


router.post("/api/wilder", wilderController.create);


module.exports = router