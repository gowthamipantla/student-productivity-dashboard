let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  let completed = 0;
  tasks.forEach((task, index) => {
    if (currentFilter === "completed" && !task.done) return;
    if (currentFilter === "pending" && task.done) return;
    const li = document.createElement("li");
    if (task.done) completed++;
    li.innerHTML = `
        <input type="checkbox" ${task.done ? "checked" : ""} onclick="toggleTask(${index})">

        <span style="${task.done ? "text-decoration:line-through" : ""}">
        ${task.text}
        </span>

        <span class="priority ${task.priority}">
        ${task.priority}
        </span>

        <button onclick="editTask(${index})">Edit</button>
<button onclick="deleteTask(${index})">Delete</button>
        `;

    taskList.appendChild(li);
  });

  updateProgress(completed);
}

function addTask() {
  const input = document.getElementById("taskInput");
  const priority = document.getElementById("priority").value;
  const text = input.value.trim();
  if (text === "") return;
  tasks.push({
    text: text,
    priority: priority,
    done: false,
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  displayTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

function updateProgress(completed) {
  const total = tasks.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const remaining = total - completed;

  document.getElementById("taskStats").innerText =
    `Completed: ${completed} | Remaining: ${remaining}`;
  document.getElementById("progressText").innerText =
    "Progress: " + percent + "%";

  document.getElementById("progressBar").style.width = percent + "%";
}

displayTasks();

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("darkToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });
});

function filterTasks(type) {
  currentFilter = type;
  displayTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);

  if (newText === null || newText.trim() === "") return;

  tasks[index].text = newText.trim();

  localStorage.setItem("tasks", JSON.stringify(tasks));

  displayTasks();
}
