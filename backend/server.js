const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());


// ========================================
// TASKS FILE
// ========================================

const tasksFile = path.join(__dirname, "tasks.json");


// ========================================
// READ TASKS
// ========================================

function readTasks() {
    const data = fs.readFileSync(tasksFile, "utf8");
    return JSON.parse(data);
}


// ========================================
// SAVE TASKS
// ========================================

function saveTasks(tasks) {
    fs.writeFileSync(
        tasksFile,
        JSON.stringify(tasks, null, 2)
    );
}


// ========================================
// API HOME
// ========================================

app.get("/api", (req, res) => {
    res.json({
        message: "TechBridge Internship API",
        status: "running"
    });
});


// ========================================
// GET ALL TASKS
// GET /api/tasks
// ========================================

app.get("/api/tasks", (req, res) => {
    try {
        const tasks = readTasks();

        res.json(tasks);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to load tasks."
        });
    }
});


// ========================================
// GET ONE TASK
// GET /api/tasks/:id
// ========================================

app.get("/api/tasks/:id", (req, res) => {
    try {
        const tasks = readTasks();

        const id = Number(req.params.id);

        const task = tasks.find(
            task => task.id === id
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found."
            });
        }

        res.json(task);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to load task."
        });
    }
});


// ========================================
// UPDATE TASK
// PUT /api/tasks/:id
// ========================================

app.put("/api/tasks/:id", (req, res) => {
    try {
        const tasks = readTasks();

        const id = Number(req.params.id);

        const task = tasks.find(
            task => task.id === id
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found."
            });
        }

        const { status } = req.body;

        const validStatuses = [
            "completed",
            "in-progress",
            "not-started"
        ];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status."
            });
        }

        task.status = status;

        saveTasks(tasks);

        res.json({
            message: "Task updated successfully.",
            task: task
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update task."
        });
    }
});


// ========================================
// SERVE FRONTEND
// ========================================

app.use(
    express.static(
        path.join(__dirname, "..")
    )
);


// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
    console.log(
        `TechBridge server running at http://localhost:${PORT}`
    );
});