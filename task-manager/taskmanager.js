let tasks = JSON.parse(localStorage.getItem("flowTasks")) || [];

let currentFilter = "all";

const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

const modal = document.getElementById("modal");
const taskForm = document.getElementById("taskForm");

const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");


// -----------------------------
// SAVE
// -----------------------------

function saveTasks() {
  localStorage.setItem("flowTasks", JSON.stringify(tasks));
}


// -----------------------------
// OPEN / CLOSE MODAL
// -----------------------------

function openModal() {
  modal.classList.add("show");

  document.getElementById("taskTitle").focus();
}

function closeModal() {
  modal.classList.remove("show");

  taskForm.reset();
}

document
  .getElementById("addTaskBtn")
  .addEventListener("click", openModal);

document
  .getElementById("emptyAddBtn")
  .addEventListener("click", openModal);

document
  .getElementById("closeModal")
  .addEventListener("click", closeModal);

modal.addEventListener("click", event => {
  if (event.target === modal) {
    closeModal();
  }
});


// -----------------------------
// CREATE TASK
// -----------------------------

taskForm.addEventListener("submit", event => {

  event.preventDefault();

  const task = {

    id: Date.now(),

    title:
      document.getElementById("taskTitle").value.trim(),

    description:
      document.getElementById("taskDescription").value.trim(),

    priority:
      document.getElementById("taskPriority").value,

    date:
      document.getElementById("taskDate").value,

    category:
      document.getElementById("taskCategory").value,

    completed: false,

    createdAt: Date.now()

  };

  tasks.unshift(task);

  saveTasks();

  closeModal();

  render();

});


// -----------------------------
// DELETE TASK
// -----------------------------

function deleteTask(id) {

  tasks = tasks.filter(task => task.id !== id);

  saveTasks();

  render();
}


// -----------------------------
// COMPLETE TASK
// -----------------------------

function toggleTask(id) {

  const task = tasks.find(task => task.id === id);

  if (!task) return;

  task.completed = !task.completed;

  saveTasks();

  render();
}


// -----------------------------
// FILTER
// -----------------------------

function getFilteredTasks() {

  let result = [...tasks];

  const search = searchInput.value
    .toLowerCase()
    .trim();

  if (search) {

    result = result.filter(task =>
      task.title.toLowerCase().includes(search) ||
      task.description.toLowerCase().includes(search)
    );

  }


  if (currentFilter === "today") {

    const today = new Date()
      .toISOString()
      .split("T")[0];

    result = result.filter(task =>
      task.date === today
    );

  }


  if (currentFilter === "important") {

    result = result.filter(task =>
      task.priority === "high"
    );

  }


  if (currentFilter === "completed") {

    result = result.filter(task =>
      task.completed
    );

  }


  // SORT

  if (sortSelect.value === "priority") {

    const order = {
      high: 1,
      medium: 2,
      low: 3
    };

    result.sort(
      (a, b) =>
        order[a.priority] - order[b.priority]
    );

  }


  if (sortSelect.value === "due") {

    result.sort((a, b) =>
      (a.date || "9999").localeCompare(
        b.date || "9999"
      )
    );

  }


  return result;
}


// -----------------------------
// RENDER
// -----------------------------

function render() {

  const filteredTasks = getFilteredTasks();

  taskList.innerHTML = "";


  filteredTasks.forEach(task => {

    const element = document.createElement("article");

    element.className =
      `task ${task.completed ? "completed" : ""}`;


    const dueDate = task.date
      ? new Date(task.date).toLocaleDateString(
          undefined,
          {
            month: "short",
            day: "numeric"
          }
        )
      : "";


    element.innerHTML = `

      <button
        class="check"
        onclick="toggleTask(${task.id})"
      >
        ${task.completed ? "✓" : ""}
      </button>


      <div class="task-content">

        <div class="task-title">
          ${escapeHTML(task.title)}
        </div>

        ${
          task.description
            ? `
              <div class="task-description">
                ${escapeHTML(task.description)}
              </div>
            `
            : ""
        }


        <div class="task-meta">

          <span class="tag">
            ${escapeHTML(task.category)}
          </span>

          <span class="priority ${task.priority}">
            ${task.priority.toUpperCase()}
          </span>

          ${
            dueDate
              ? `<span class="tag">📅 ${dueDate}</span>`
              : ""
          }

        </div>

      </div>


      <div class="task-actions">

        <button
          title="Delete"
          onclick="deleteTask(${task.id})"
        >
          ×
        </button>

      </div>

    `;

    taskList.appendChild(element);

  });


  updateEmptyState(filteredTasks);

  updateStats();

}


// -----------------------------
// EMPTY STATE
// -----------------------------

function updateEmptyState(filteredTasks) {

  if (filteredTasks.length === 0) {

    emptyState.style.display = "block";

    taskList.style.display = "none";

  } else {

    emptyState.style.display = "none";

    taskList.style.display = "grid";

  }

}


// -----------------------------
// STATISTICS
// -----------------------------

function updateStats() {

  const total = tasks.length;

  const completed =
    tasks.filter(task => task.completed).length;

  const important =
    tasks.filter(
      task => task.priority === "high"
    ).length;

  const remaining = total - completed;


  document.getElementById("statTotal")
    .textContent = total;

  document.getElementById("statCompleted")
    .textContent = completed;

  document.getElementById("statImportant")
    .textContent = important;

  document.getElementById("statRemaining")
    .textContent = remaining;


  document.getElementById("allCount")
    .textContent = total;

  document.getElementById("importantCount")
    .textContent = important;

  document.getElementById("completedCount")
    .textContent = completed;


  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const todayCount =
    tasks.filter(task =>
      task.date === today &&
      !task.completed
    ).length;

  document.getElementById("todayCount")
    .textContent = todayCount;


  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);


  document.getElementById("progressPercent")
    .textContent = `${percentage}%`;

  document
    .querySelector(".progress-circle")
    .style.setProperty(
      "--progress",
      `${percentage}%`
    );

}


// -----------------------------
// NAVIGATION FILTERS
// -----------------------------

document
  .querySelectorAll(".nav-item")
  .forEach(button => {

    button.addEventListener("click", () => {

      document
        .querySelectorAll(".nav-item")
        .forEach(item =>
          item.classList.remove("active")
        );

      button.classList.add("active");

      currentFilter =
        button.dataset.filter;


      const titles = {
        all: "All Tasks",
        today: "Today",
        important: "Important",
        completed: "Completed"
      };

      document.getElementById("sectionTitle")
        .textContent =
          titles[currentFilter];

      render();

    });

  });


// -----------------------------
// SEARCH
// -----------------------------

searchInput.addEventListener(
  "input",
  render
);


// -----------------------------
// SORT
// -----------------------------

sortSelect.addEventListener(
  "change",
  render
);


// -----------------------------
// DARK MODE
// -----------------------------

document
  .getElementById("themeBtn")
  .addEventListener("click", () => {

    document.body.classList.toggle("dark");

  });


// -----------------------------
// SECURITY HELPER
// -----------------------------

function escapeHTML(value) {

  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


// -----------------------------
// INITIAL RENDER
// -----------------------------

render();