const express = require("express");

const router = express.Router();

const tasks = [];

const validStatuses = [
    "pending",
    "in-progress",
    "completed"
];


// GET all tasks
router.get("/tasks", (req, res) => {

    return res.status(200).json({
        success: true,
        tasks: tasks
    });

});


// POST create task
router.post("/tasks", (req, res) => {

    const { title, status } = req.body;

    if (
        title === undefined ||
        status === undefined ||
        !validStatuses.includes(status)
    ) {
        return res.status(400).json({
            success: false,
            message: "Please provide valid task details"
        });
    }

    const newTask = {
        id: tasks.length + 1,
        title: title,
        status: status
    };

    tasks.push(newTask);

    return res.status(201).json({
        success: true,
        task: newTask
    });

});


// PATCH update task
router.patch("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    const { title, status } = req.body;

    if (
        status !== undefined &&
        !validStatuses.includes(status)
    ) {
        return res.status(400).json({
            success: false,
            message: "Please provide valid task details"
        });
    }

    if (title !== undefined) {
        task.title = title;
    }

    if (status !== undefined) {
        task.status = status;
    }

    return res.status(200).json({
        success: true,
        task: task
    });

});


// DELETE task
router.delete("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Task not found"
        });
    }

    tasks.splice(index, 1);

    return res.status(200).json({
        success: true,
        message: "Task deleted successfully"
    });

});


// GET tasks by status
router.get("/tasks/status/:status", (req, res) => {

    const status = req.params.status;

    const filteredTasks = tasks.filter(
        task => task.status === status
    );

    return res.status(200).json({
        success: true,
        tasks: filteredTasks
    });

});


module.exports = router;