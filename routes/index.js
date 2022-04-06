const express = require('express');
const router = express.Router();
const userRoute = require("./user");
const taskRoute = require("./task");

router.use("/user", userRoute);
router.use("/task", taskRoute);

module.exports = router;