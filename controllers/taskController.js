const { Task } = require("../models");
const { getUserData } = require("../helpers/jwt"); 

class taskController {
    static async createTask (req, res) {
        try {
            const token = req.headers.token;
            const userData = getUserData(token);
            if (!userData.id) {
                return res.status(401).json({ message: "Not Authorized" })
            };
            
            const task = req.body.task;
            const status = req.body.status;
            const objTask = {
                task: task,
                status: status,
                userId: userData.id
            }
            const createdTask = await Task.create(objTask);
            if (createdTask) {
                return res.status(201).json(createdTask);
            } else {
                return res.status(400).json({
                    status: "failed",
                    message: "Failed to create Task!",
                });
            };
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "failed",
                message: error.message || "Internal Server Error",
            });
        }
    };
                
    static async viewTask (req, res) {
        try {
            const userData = getUserData(req.headers.token);
            const userId = userData.id;
            const task = await Task.findAll({
                where: {
                    userId: userId
                }
            });
            return res.status(200).json({success: { message: "This is the task" }, data: task})
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "failed",
                message: error.message || "Internal Server Error",
            });
        };
    }

    static async updateTask (req, res) {
        try {
            const userData = getUserData(req.headers.token);
            const userId = userData.id;
            const taskId = req.params.id;
            const updatedTask = await Task.update(
                {status: "done"},
                {where: {id: taskId}
            });

            if (!updatedTask) {
                return res.status(400).json({
                    status: "failed",
                    message: "Failed to update!",
                });
            } else {
                return res.status(200).json("Update success");
            };
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "failed",
                message: error.message || "Internal Server Error",
            });
        }
    }

    static async deleteTask (req, res) {
        try {
            const userData = getUserData(req.headers.token);
            const userGender = userData.gender;
            const userId = userData.id;
            const taskId = req.params.id;
            
            // Authorization agar Female saja yg bisa delete task
            if (userGender !== "female") {
                return res.status(403).json({message: "You are not allowed to delete task"})
            };
            const deletedTask = await Task.destroy({
                where: {
                    id: taskId
                }
            });

            if(!deletedTask) {
                return res.status(400).json({
                    status: "failed",
                    message: "Failed to delete!",
                });
            };

            return res.status(200).json({
                status: "success",
                message: "Successfully delete task!",
                });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: "failed",
                message: error.message || "Internal Server Error",
            });
        }
    }
};

module.exports = taskController;
