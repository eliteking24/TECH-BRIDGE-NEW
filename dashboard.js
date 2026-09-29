/* =========================================
   TECHBRIDGE
   TASK 7 - API CONNECTED DASHBOARD
========================================= */

const API_URL = "/api/tasks";

let internshipTasks = [];
let currentFilter = "all";


// =========================================
// DOM ELEMENTS
// =========================================

const tasksContainer =
    document.getElementById("tasksContainer");

const emptyState =
    document.getElementById("emptyState");

const completedCount =
    document.getElementById("completedCount");

const totalCount =
    document.getElementById("totalCount");

const remainingCount =
    document.getElementById("remainingCount");

const progressPercentage =
    document.getElementById("progressPercentage");

const progressFill =
    document.getElementById("progressFill");

const currentTaskNumber =
    document.getElementById("currentTaskNumber");

const currentTaskTitle =
    document.getElementById("currentTaskTitle");

const taskModal =
    document.getElementById("taskModal");

const modalClose =
    document.getElementById("modalClose");

const modalTaskNumber =
    document.getElementById("modalTaskNumber");

const modalTaskTitle =
    document.getElementById("modalTaskTitle");

const modalTaskDescription =
    document.getElementById("modalTaskDescription");

const modalTaskStatus =
    document.getElementById("modalTaskStatus");

const modalTaskDay =
    document.getElementById("modalTaskDay");

const taskLoading =
    document.getElementById("taskLoading");

const apiStatusText =
    document.getElementById("apiStatusText");

const apiStatus =
    document.getElementById("apiStatus");


// =========================================
// LOAD TASKS FROM BACKEND
// =========================================

async function loadTasks() {

    showLoading(true);

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load tasks");
        }

        internshipTasks = await response.json();

        setBackendStatus(true);

        renderTasks();
        updateProgress();

    } catch (error) {

        console.error(error);

        setBackendStatus(false);

        showError();

    } finally {

        showLoading(false);

    }
}


// =========================================
// LOADING STATE
// =========================================

function showLoading(show) {

    if (!taskLoading) return;

    taskLoading.style.display =
        show ? "block" : "none";
}


// =========================================
// ERROR STATE
// =========================================

function showError() {

    if (!tasksContainer) return;

    tasksContainer.innerHTML = `
        <div class="task-error">
            <h3>Unable to load tasks</h3>
            <p>
                Make sure the TechBridge backend
                server is running.
            </p>
            <button onclick="loadTasks()">
                Try Again
            </button>
        </div>
    `;

}


// =========================================
// BACKEND STATUS
// =========================================

function setBackendStatus(connected) {

    if (!apiStatusText) return;

    if (connected) {

        apiStatusText.textContent =
            "Backend Connected";

        if (apiStatus) {
            apiStatus.classList.add("connected");
        }

    } else {

        apiStatusText.textContent =
            "Backend Offline";

        if (apiStatus) {
            apiStatus.classList.remove("connected");
        }

    }
}


// =========================================
// RENDER TASKS
// =========================================

function renderTasks() {

    if (!tasksContainer) return;

    tasksContainer.innerHTML = "";

    const filteredTasks =
        internshipTasks.filter(task => {

            if (currentFilter === "all") {
                return true;
            }

            return task.status === currentFilter;

        });


    if (filteredTasks.length === 0) {

        if (emptyState) {
            emptyState.classList.add("show");
        }

        return;
    }


    if (emptyState) {
        emptyState.classList.remove("show");
    }


    filteredTasks.forEach((task, index) => {

        const card =
            document.createElement("article");

        card.className =
            `task-card ${task.status}`;

        card.style.animationDelay =
            `${index * 0.05}s`;


        const completed =
            task.status === "completed";


        card.innerHTML = `

            <div class="task-card-top">

                <span class="task-number">
                    TASK ${String(task.id).padStart(2, "0")}
                </span>

                <span class="task-status ${task.status}">
                    ${getStatusLabel(task.status)}
                </span>

            </div>

            <h3>
                ${task.title}
            </h3>

            <p>
                ${task.description}
            </p>

            <div class="task-day">
                Day ${task.day}
            </div>

            <div class="task-actions">

                <button
                    class="task-btn view-task-btn"
                    data-action="view"
                    data-id="${task.id}"
                >
                    View Task
                </button>

                <button
                    class="task-btn complete-btn ${
                        completed
                            ? "completed-btn"
                            : ""
                    }"
                    data-action="complete"
                    data-id="${task.id}"
                    ${completed ? "disabled" : ""}
                >
                    ${
                        completed
                            ? "✓ Completed"
                            : "Mark as Completed"
                    }
                </button>

            </div>
        `;


        tasksContainer.appendChild(card);

    });
}


// =========================================
// STATUS LABEL
// =========================================

function getStatusLabel(status) {

    if (status === "completed") {
        return "Completed";
    }

    if (status === "in-progress") {
        return "In Progress";
    }

    return "Not Started";
}


// =========================================
// UPDATE PROGRESS
// =========================================

function updateProgress() {

    const total =
        internshipTasks.length;

    const completed =
        internshipTasks.filter(
            task => task.status === "completed"
        ).length;

    const remaining =
        total - completed;

    const percentage =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    if (totalCount) {
        totalCount.textContent = total;
    }

    if (completedCount) {
        completedCount.textContent =
            completed;
    }

    if (remainingCount) {
        remainingCount.textContent =
            remaining;
    }

    if (progressPercentage) {
        progressPercentage.textContent =
            `${percentage}%`;
    }

    if (progressFill) {
        progressFill.style.width =
            `${percentage}%`;
    }

    updateCurrentTask();
}


// =========================================
// CURRENT TASK
// =========================================

function updateCurrentTask() {

    const currentTask =
        internshipTasks.find(
            task => task.status !== "completed"
        );


    if (!currentTask) {

        if (currentTaskNumber) {
            currentTaskNumber.textContent =
                "Complete";
        }

        if (currentTaskTitle) {
            currentTaskTitle.textContent =
                "All tasks completed!";
        }

        return;
    }


    if (currentTaskNumber) {
        currentTaskNumber.textContent =
            `Task ${currentTask.id}`;
    }

    if (currentTaskTitle) {
        currentTaskTitle.textContent =
            currentTask.title;
    }
}


// =========================================
// VIEW TASK
// GET /api/tasks/:id
// =========================================

async function viewTask(taskId) {

    try {

        const response =
            await fetch(
                `${API_URL}/${taskId}`
            );

        if (!response.ok) {
            throw new Error(
                "Failed to load task"
            );
        }

        const task =
            await response.json();


        if (modalTaskNumber) {
            modalTaskNumber.textContent =
                `TASK ${String(task.id).padStart(2, "0")}`;
        }

        if (modalTaskTitle) {
            modalTaskTitle.textContent =
                task.title;
        }

        if (modalTaskDescription) {
            modalTaskDescription.textContent =
                task.description;
        }

        if (modalTaskStatus) {
            modalTaskStatus.textContent =
                getStatusLabel(task.status);
        }

        if (modalTaskDay) {
            modalTaskDay.textContent =
                `Day ${task.day}`;
        }


        if (taskModal) {

            taskModal.classList.add("show");

            document.body.style.overflow =
                "hidden";

        }

    } catch (error) {

        console.error(error);

        showNotification(
            "Unable to load task."
        );
    }
}


// =========================================
// MARK TASK COMPLETED
// PUT /api/tasks/:id
// =========================================

async function completeTask(taskId) {

    try {

        const response =
            await fetch(
                `${API_URL}/${taskId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        status: "completed"
                    })
                }
            );


        if (!response.ok) {
            throw new Error(
                "Failed to update task"
            );
        }


        const result =
            await response.json();


        const task =
            internshipTasks.find(
                item => item.id === taskId
            );


        if (task) {
            task.status =
                result.task.status;
        }


        renderTasks();

        updateProgress();

        showNotification(
            "Task marked as completed."
        );


    } catch (error) {

        console.error(error);

        showNotification(
            "Unable to update task."
        );

    }
}


// =========================================
// TASK BUTTON EVENTS
// =========================================

if (tasksContainer) {

    tasksContainer.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-action]"
                );


            if (!button) return;


            const taskId =
                Number(button.dataset.id);

            const action =
                button.dataset.action;


            if (action === "view") {
                viewTask(taskId);
            }


            if (action === "complete") {
                completeTask(taskId);
            }

        }
    );

}


// =========================================
// FILTERS
// =========================================

const filterButtons =
    document.querySelectorAll(
        ".filter-btn"
    );


filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });


            button.classList.add("active");


            currentFilter =
                button.dataset.filter;


            renderTasks();

        }
    );

});


// =========================================
// CLOSE MODAL
// =========================================

function closeTaskModal() {

    if (!taskModal) return;

    taskModal.classList.remove("show");

    document.body.style.overflow = "";
}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeTaskModal
    );

}


if (taskModal) {

    taskModal.addEventListener(
        "click",
        event => {

            if (
                event.target === taskModal
            ) {

                closeTaskModal();

            }

        }
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            closeTaskModal();
        }

    }
);


// =========================================
// NOTIFICATION
// =========================================

function showNotification(message) {

    const notification =
        document.createElement("div");

    notification.className =
        "dashboard-notification";

    notification.textContent =
        `✓ ${message}`;


    document.body.appendChild(
        notification
    );


    setTimeout(() => {

        notification.classList.add("show");

    }, 20);


    setTimeout(() => {

        notification.classList.remove(
            "show"
        );

        setTimeout(() => {
            notification.remove();
        }, 300);

    }, 2500);
}


// =========================================
// TECHNOLOGY EXPLORER
// =========================================

const technologies = {

    next: {
        category: "FRONTEND FRAMEWORK",
        title: "Next.js",
        description:
            "Next.js is a React framework for building modern web applications with features such as routing, server-side rendering and optimized development.",
        commonUse:
            "Modern Web Applications",
        builtWith:
            "React + JavaScript"
    },

    vue: {
        category: "FRONTEND FRAMEWORK",
        title: "Vue.js",
        description:
            "Vue.js is a progressive JavaScript framework used to build interactive user interfaces and single-page applications.",
        commonUse:
            "Interactive Web Interfaces",
        builtWith:
            "JavaScript"
    },

    angular: {
        category: "FRONTEND FRAMEWORK",
        title: "Angular",
        description:
            "Angular is a TypeScript-based framework used to build structured and scalable web applications.",
        commonUse:
            "Large Web Applications",
        builtWith:
            "TypeScript"
    },

    backend: {
        category: "SERVER-SIDE DEVELOPMENT",
        title: "Backend Development",
        description:
            "Backend development handles server-side logic, APIs, databases, authentication and application business logic.",
        commonUse:
            "APIs, Servers & Databases",
        builtWith:
            "Node.js, Express.js, Django"
    }

};


const technologyButtons =
    document.querySelectorAll(
        ".technology-btn"
    );


const technologyCategory =
    document.getElementById(
        "technologyCategory"
    );

const technologyTitle =
    document.getElementById(
        "technologyTitle"
    );

const technologyDescription =
    document.getElementById(
        "technologyDescription"
    );

const technologyDetails =
    document.getElementById(
        "technologyDetails"
    );


technologyButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            technologyButtons.forEach(btn => {
                btn.classList.remove("active");
            });


            button.classList.add("active");


            const technology =
                technologies[
                    button.dataset.tech
                ];


            if (!technology) return;


            if (technologyCategory) {
                technologyCategory.textContent =
                    technology.category;
            }

            if (technologyTitle) {
                technologyTitle.textContent =
                    technology.title;
            }

            if (technologyDescription) {
                technologyDescription.textContent =
                    technology.description;
            }

            if (technologyDetails) {

                technologyDetails.innerHTML = `
                    <div>
                        <span>COMMON USE</span>
                        <strong>
                            ${technology.commonUse}
                        </strong>
                    </div>

                    <div>
                        <span>BUILT WITH</span>
                        <strong>
                            ${technology.builtWith}
                        </strong>
                    </div>
                `;

            }

        }
    );

});


// =========================================
// START
// =========================================

loadTasks();