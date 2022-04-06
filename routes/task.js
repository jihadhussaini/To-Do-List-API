const express = require('express');
const { isSignIn } = require('../middlewares/auth');
const router = express.Router();
const taskController = require("../controllers/taskController");


router.post("/", isSignIn, taskController.createTask);
router.get("/view", isSignIn, taskController.viewTask);
router.put("/update/:id", isSignIn, taskController.updateTask);
router.delete("/delete/:id", isSignIn, taskController.deleteTask);

module.exports = router;