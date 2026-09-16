
/* =========================================
   TECHBRIDGE TASK 4
   INTERACTIVE INTERNSHIP ROADMAP
========================================= */


/* =========================================
   DATA ANALYTICS TASKS
========================================= */

const dataAnalyticsTasks = [
    {
        number: 1,
        title: "Data Cleaning Basics",
        day: 1,
        description:
            "Clean a messy dataset using Google Sheets or Excel. Identify and fix duplicate rows, blank cells, inconsistent formatting, and incorrect data types.",
        difficulty: "Beginner"
    },

    {
        number: 2,
        title: "Formulas & Pivot Tables",
        day: 4,
        description:
            "Use spreadsheet formulas and Pivot Tables to answer questions and extract useful insights from a dataset.",
        difficulty: "Beginner"
    },

    {
        number: 3,
        title: "Data Visualization",
        day: 8,
        description:
            "Create charts and a simple dashboard that communicate useful insights from a dataset.",
        difficulty: "Beginner → Intermediate"
    },

    {
        number: 4,
        title: "Introduction to SQL",
        day: 11,
        description:
            "Practice basic SQL queries and use them to answer real-world questions about data.",
        difficulty: "Beginner → Intermediate"
    },

    {
        number: 5,
        title: "SQL Joins & Aggregations",
        day: 15,
        description:
            "Use JOIN, GROUP BY, COUNT, SUM and AVG to analyze information across multiple tables.",
        difficulty: "Intermediate"
    },

    {
        number: 6,
        title: "Lookup Functions & Data Wrangling",
        day: 19,
        description:
            "Use VLOOKUP or XLOOKUP to combine related datasets and handle data mismatches.",
        difficulty: "Intermediate"
    },

    {
        number: 7,
        title: "Mini Analysis Project",
        day: 22,
        description:
            "Complete a small end-to-end analysis involving data cleaning, formulas, Pivot Tables, charts and recommendations.",
        difficulty: "Intermediate"
    },

    {
        number: 8,
        title: "Capstone Project",
        day: 26,
        description:
            "Complete a larger project combining spreadsheet analysis and SQL using at least two related tables.",
        difficulty: "Intermediate"
    }
];


/* =========================================
   WEB DEVELOPMENT TASKS
========================================= */

const webDevelopmentTasks = [
    {
        number: 1,
        title: "Build TechBridge Homepage",
        day: 1,
        description:
            "Create the first version of the TechBridge website using HTML and CSS.",
        difficulty: "Beginner"
    },

    {
        number: 2,
        title: "Build TechBridge Programs Experience",
        day: 4,
        description:
            "Create a Programs experience presenting TechBridge's available learning programs.",
        difficulty: "Beginner"
    },

    {
        number: 3,
        title: "Build Internship Tasks Experience",
        day: 8,
        description:
            "Create an interface that presents the TechBridge internship tasks and helps users understand the internship journey.",
        difficulty: "Beginner → Intermediate"
    },

    {
        number: 4,
        title: "Build an Interactive Internship Roadmap",
        day: 11,
        description:
            "Use JavaScript to allow visitors to switch between the Data Analytics and Web Development internship tracks.",
        difficulty: "Beginner → Intermediate"
    },

    {
        number: 5,
        title: "Build Intern Registration Experience",
        day: 15,
        description:
            "Create a professional registration and onboarding interface for TechBridge interns.",
        difficulty: "Intermediate"
    },

    {
        number: 6,
        title: "Build Task Submission System",
        day: 19,
        description:
            "Create an interface through which interns can prepare and submit their task work.",
        difficulty: "Intermediate"
    },

    {
        number: 7,
        title: "Build Intern Dashboard",
        day: 22,
        description:
            "Create a dashboard where an intern can view their profile, progress, tasks and submissions.",
        difficulty: "Intermediate"
    },

    {
        number: 8,
        title: "Build Complete TechBridge Internship Platform",
        day: 26,
        description:
            "Combine the different components created during the internship into a complete TechBridge platform.",
        difficulty: "Intermediate"
    }
];


/* =========================================
   VARIABLES
========================================= */

let selectedTrack = "data";


/* =========================================
   DOM ELEMENTS
========================================= */

const taskContainer = document.getElementById("taskContainer");
const currentTrack = document.getElementById("currentTrack");
const trackDescription = document.getElementById("trackDescription");

const dataTrackBtn = document.getElementById("dataTrackBtn");
const webTrackBtn = document.getElementById("webTrackBtn");


/* =========================================
   GET DIFFICULTY CLASS
========================================= */

function getDifficultyClass(difficulty) {

    if (difficulty === "Intermediate") {
        return "intermediate";
    }

    if (difficulty === "Beginner → Intermediate") {
        return "progressive";
    }

    return "beginner";
}


/* =========================================
   DISPLAY TASKS
========================================= */

function displayTasks() {

    let tasks;

    if (selectedTrack === "data") {
        tasks = dataAnalyticsTasks;
    } else {
        tasks = webDevelopmentTasks;
    }


    /* Clear existing tasks */

    taskContainer.innerHTML = "";


    /* Create each task */

    tasks.forEach(function (task, index) {

        const taskCard = document.createElement("article");

        taskCard.className = "task-card";

        taskCard.style.animationDelay =
            `${index * 0.07}s`;


        const difficultyClass =
            getDifficultyClass(task.difficulty);


        taskCard.innerHTML = `
            <div class="task-number">
                ${String(task.number).padStart(2, "0")}
            </div>

            <div class="task-content">

                <div class="task-top">

                    <span class="task-day">
                        DAY ${String(task.day).padStart(2, "0")}
                    </span>

                    <span class="difficulty ${difficultyClass}">
                        ${task.difficulty}
                    </span>

                </div>

                <div class="task-label">
                    TASK ${task.number}
                </div>

                <h3>
                    ${task.title}
                </h3>

                <p>
                    ${task.description}
                </p>

                <span class="task-arrow">
                    →
                </span>

            </div>
        `;


        taskContainer.appendChild(taskCard);

    });
}


/* =========================================
   UPDATE TRACK
========================================= */

function updateTrack() {

    /* Fade current tasks out */

    taskContainer.classList.add("is-switching");


    setTimeout(function () {

        if (selectedTrack === "data") {

            currentTrack.textContent =
                "DATA ANALYTICS";

            trackDescription.textContent =
                "Working with data, discovering patterns and turning information into useful insights.";

            dataTrackBtn.classList.add("active");

            webTrackBtn.classList.remove("active");

        } else {

            currentTrack.textContent =
                "WEB DEVELOPMENT";

            trackDescription.textContent =
                "Designing and building websites and web experiences using modern development fundamentals.";

            webTrackBtn.classList.add("active");

            dataTrackBtn.classList.remove("active");

        }


        /* Load new tasks */

        displayTasks();


        /* Bring tasks back */

        requestAnimationFrame(function () {

            taskContainer.classList.remove("is-switching");

        });

    }, 250);
}


/* =========================================
   DATA ANALYTICS BUTTON
========================================= */

dataTrackBtn.addEventListener("click", function () {

    if (selectedTrack === "data") {
        return;
    }

    selectedTrack = "data";

    updateTrack();

});


/* =========================================
   WEB DEVELOPMENT BUTTON
========================================= */

webTrackBtn.addEventListener("click", function () {

    if (selectedTrack === "web") {
        return;
    }

    selectedTrack = "web";

    updateTrack();

});


/* =========================================
   INITIAL LOAD
========================================= */

displayTasks();