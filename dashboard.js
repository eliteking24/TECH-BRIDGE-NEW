/* =========================================
   TECHBRIDGE
   TASK 6 — INTERACTIVE INTERN DASHBOARD
========================================= */


/* =========================================
   INTERNSHIP TASK DATA
========================================= */

const internshipTasks = [

    {
        id: 1,
        title: "Build TechBridge Homepage",
        description:
            "Create the first version of the TechBridge website using HTML and CSS. Focus on structure, branding, navigation and responsive design.",
        day: 1,
        status: "completed"
    },

    {
        id: 2,
        title: "Build TechBridge Programs Experience",
        description:
            "Create a professional Programs experience that presents the Data Analytics and Web Development programs offered by TechBridge.",
        day: 4,
        status: "completed"
    },

    {
        id: 3,
        title: "Build Internship Tasks Experience",
        description:
            "Create an interface that presents the internship tasks and helps interns understand the overall internship journey.",
        day: 8,
        status: "completed"
    },

    {
        id: 4,
        title: "Build an Interactive Internship Roadmap",
        description:
            "Use JavaScript to create an interactive roadmap that allows interns to explore their internship journey.",
        day: 11,
        status: "completed"
    },

    {
        id: 5,
        title: "Build TechBridge Challenge Hub",
        description:
            "Create the TechBridge Challenge Hub where interns can explore practical challenges and test their technical skills.",
        day: 15,
        status: "completed"
    },

    {
        id: 6,
        title: "Build Interactive Intern Dashboard",
        description:
            "Create an interactive dashboard where interns can track their tasks, monitor progress and explore modern web technologies.",
        day: 19,
        status: "in-progress"
    },

    {
        id: 7,
        title: "Build Task Submission System",
        description:
            "Create an interface through which interns can prepare and submit their completed internship tasks.",
        day: 22,
        status: "not-started"
    },

    {
        id: 8,
        title: "Build Complete TechBridge Internship Platform",
        description:
            "Combine the different components created throughout the internship into a complete TechBridge internship platform.",
        day: 26,
        status: "not-started"
    }

];


/* =========================================
   MODERN TECHNOLOGY DATA
========================================= */

const technologies = {

    next: {
        category: "FRONTEND FRAMEWORK",

        title: "Next.js",

        description:
            "Next.js is a React framework used to build modern web applications. It provides features such as routing, server-side rendering and optimized application development.",

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
            "Angular is a TypeScript-based framework developed by Google for building large-scale and structured web applications.",

        commonUse:
            "Large Web Applications",

        builtWith:
            "TypeScript"
    },


    backend: {
        category: "SERVER-SIDE DEVELOPMENT",

        title: "Backend Development",

        description:
            "Backend development focuses on the server-side of a web application. It manages databases, authentication, business logic, APIs and communication between the frontend and server.",

        commonUse:
            "APIs, Servers & Databases",

        builtWith:
            "Node.js, Express.js, Django & more"
    }

};


/* =========================================
   VARIABLES
========================================= */

let currentFilter = "all";

let currentTaskId = null;


/* =========================================
   DOM ELEMENTS
========================================= */

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


/* =========================================
   LOCAL STORAGE
========================================= */

const STORAGE_KEY =
    "techbridge_task6_progress";


function saveProgress() {

    const progress = internshipTasks.map(task => ({
        id: task.id,
        status: task.status
    }));


    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(progress)
    );

}


function loadProgress() {

    const savedProgress =
        localStorage.getItem(STORAGE_KEY);


    if (!savedProgress) {
        return;
    }


    try {

        const savedTasks =
            JSON.parse(savedProgress);


        savedTasks.forEach(savedTask => {

            const task =
                internshipTasks.find(
                    item => item.id === savedTask.id
                );


            if (task) {

                task.status =
                    savedTask.status;

            }

        });

    } catch (error) {

        console.log(
            "Unable to load saved task progress."
        );

    }

}


/* =========================================
   STATUS LABEL
========================================= */

function getStatusLabel(status) {

    if (status === "completed") {
        return "Completed";
    }


    if (status === "in-progress") {
        return "In Progress";
    }


    return "Not Started";

}


/* =========================================
   RENDER TASKS
========================================= */

function renderTasks() {

    tasksContainer.innerHTML = "";


    const filteredTasks =
        internshipTasks.filter(task => {

            if (currentFilter === "all") {
                return true;
            }


            return task.status === currentFilter;

        });


    if (filteredTasks.length === 0) {

        emptyState.classList.add("show");

        return;

    }


    emptyState.classList.remove("show");


    filteredTasks.forEach((task, index) => {

        const card =
            document.createElement("article");


        card.className =
            `task-card ${task.status}`;


        card.style.animationDelay =
            `${index * 0.06}s`;


        const isCompleted =
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
                Introduced: Day ${task.day}
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
                        isCompleted
                            ? "completed-btn"
                            : ""
                    }"
                    data-action="complete"
                    data-id="${task.id}"
                    ${isCompleted ? "disabled" : ""}
                >

                    ${
                        isCompleted
                            ? "✓ Completed"
                            : "Mark as Completed"
                    }

                </button>

            </div>

        `;


        tasksContainer.appendChild(card);

    });

}


/* =========================================
   UPDATE PROGRESS
========================================= */

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
        Math.round((completed / total) * 100);


    completedCount.textContent =
        completed;


    totalCount.textContent =
        total;


    remainingCount.textContent =
        remaining;


    progressPercentage.textContent =
        `${percentage}%`;


    progressFill.style.width =
        `${percentage}%`;


    updateCurrentTask();

}


/* =========================================
   UPDATE CURRENT TASK
========================================= */

function updateCurrentTask() {

    const currentTask =
        internshipTasks.find(
            task => task.status !== "completed"
        );


    if (!currentTask) {

        currentTaskNumber.textContent =
            "Complete";


        currentTaskTitle.textContent =
            "All internship tasks completed!";


        return;

    }


    currentTaskNumber.textContent =
        `Task ${currentTask.id}`;


    currentTaskTitle.textContent =
        currentTask.title;

}


/* =========================================
   MARK TASK COMPLETED
========================================= */

function completeTask(taskId) {

    const task =
        internshipTasks.find(
            task => task.id === taskId
        );


    if (!task) {
        return;
    }


    if (task.status === "completed") {
        return;
    }


    task.status =
        "completed";


    saveProgress();

    renderTasks();

    updateProgress();


    showNotification(
        `Task ${task.id} marked as completed.`
    );


    if (
        internshipTasks.every(
            item => item.status === "completed"
        )
    ) {

        setTimeout(() => {

            showNotification(
                "🎉 Congratulations! You completed all 8 tasks!"
            );

        }, 500);

    }

}


/* =========================================
   FILTER TASKS
========================================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");


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


/* =========================================
   TASK CARD EVENTS
========================================= */

tasksContainer.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest("button");


        if (!button) {
            return;
        }


        const taskId =
            Number(button.dataset.id);


        const action =
            button.dataset.action;


        if (action === "complete") {

            completeTask(taskId);

        }


        if (action === "view") {

            openTaskModal(taskId);

        }

    }
);


/* =========================================
   TASK MODAL
========================================= */

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


function openTaskModal(taskId) {

    const task =
        internshipTasks.find(
            item => item.id === taskId
        );


    if (!task) {
        return;
    }


    currentTaskId =
        taskId;


    modalTaskNumber.textContent =
        `TASK ${String(task.id).padStart(2, "0")}`;


    modalTaskTitle.textContent =
        task.title;


    modalTaskDescription.textContent =
        task.description;


    modalTaskStatus.textContent =
        getStatusLabel(task.status);


    modalTaskDay.textContent =
        `Day ${task.day}`;


    taskModal.classList.add("show");


    document.body.style.overflow =
        "hidden";

}


function closeTaskModal() {

    taskModal.classList.remove("show");


    document.body.style.overflow =
        "";


    currentTaskId =
        null;

}


modalClose.addEventListener(
    "click",
    closeTaskModal
);


taskModal.addEventListener(
    "click",
    event => {

        if (event.target === taskModal) {

            closeTaskModal();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeTaskModal();

        }

    }
);


/* =========================================
   TECHNOLOGY EXPLORER
========================================= */

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

                btn.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );


            const technology =
                technologies[
                    button.dataset.tech
                ];


            if (!technology) {
                return;
            }


            const display =
                document.querySelector(
                    ".technology-display"
                );


            display.style.opacity =
                "0";


            setTimeout(() => {

                technologyCategory.textContent =
                    technology.category;


                technologyTitle.textContent =
                    technology.title;


                technologyDescription.textContent =
                    technology.description;


                technologyDetails.innerHTML = `

                    <div>

                        <span>
                            COMMON USE
                        </span>

                        <strong>
                            ${technology.commonUse}
                        </strong>

                    </div>


                    <div>

                        <span>
                            BUILT WITH
                        </span>

                        <strong>
                            ${technology.builtWith}
                        </strong>

                    </div>

                `;


                display.style.opacity =
                    "1";

            }, 180);

        }
    );

});


/* =========================================
   NOTIFICATION
========================================= */

function showNotification(message) {

    const oldNotification =
        document.querySelector(
            ".dashboard-notification"
        );


    if (oldNotification) {

        oldNotification.remove();

    }


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

        notification.classList.add(
            "show"
        );

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


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle =
    document.getElementById(
        "menuToggle"
    );


const navLinks =
    document.querySelector(
        ".nav-links"
    );


menuToggle.addEventListener(
    "click",
    () => {

        navLinks.classList.toggle(
            "mobile-open"
        );

    }
);


/* =========================================
   INITIALIZE DASHBOARD
========================================= */

loadProgress();

renderTasks();

updateProgress();