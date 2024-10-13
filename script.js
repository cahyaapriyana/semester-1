// Memuat daftar tugas dari localStorage saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadTasks);
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addTaskToDOM(task.text, task.completed, task.timestamp);
  });
}
// Menambahkan tugas ke dalam DOM dan localStorage
function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();
  if (taskText !== "") {
    let timestamp = Date.now(); // Mendapatkan timestamp saat ini
    addTaskToDOM(taskText, false, timestamp);
    saveTaskToLocalStorage(taskText, false, timestamp);
    taskInput.value = "";

    alert("Tugas baru telah ditambahkan!");
  }
}

document.querySelector(".add-btn").addEventListener("click", addTask);

document.getElementById("taskInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Menambahkan tugas ke dalam DOM
function addTaskToDOM(taskText, completed, timestamp) {
  let li = document.createElement("li");
  li.className = completed ? "completed" : "";

  let taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;
  taskSpan.className = "task-text";
  li.appendChild(taskSpan);

  let timeSpan = document.createElement("span");
  let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  timeSpan.textContent = new Date(timestamp).toLocaleString("en-GB", options);
  timeSpan.className = "task-time";
  li.appendChild(timeSpan);

  let completeButton = document.createElement("button");
  completeButton.textContent = "Selesai";
  completeButton.className = "complete-btn";
  completeButton.addEventListener("click", function () {
    li.classList.toggle("completed");
    updateTaskInLocalStorage(taskText);
  });
  li.appendChild(completeButton);

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Hapus";
  deleteButton.className = "delete-btn";
  deleteButton.addEventListener("click", function () {
    deleteTask(taskText, li);
  });
  li.appendChild(deleteButton);

  document.getElementById("taskList").appendChild(li);
}

function saveTaskToLocalStorage(taskText, completed, timestamp) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: completed, timestamp: timestamp });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskInLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((task) => {
    if (task.text === taskText) {
      task.completed = !task.completed;
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Menghapus tugas dari DOM dan localStorage
function deleteTask(taskText, taskElement) {
  if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskElement.remove();
  }
}

function displayThirdTaskTime() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (tasks.length >= 3) {
    let thirdTask = tasks[2];
    let timeAdded = new Date(thirdTask.timeAdded);
    let now = new Date();
    let timeDifference = now - timeAdded;
    let hoursDifference = timeDifference / (1000 * 60 * 60);
    if (hoursDifference <= 24) {
      alert(
        "Waktu to-do list ketiga ditambahkan: " +
          timeAdded.toLocaleString("en-GB", options)
      );
    } else {
      alert("To-do list ketiga ditambahkan lebih dari 24 jam yang lalu.");
    }
  } else {
    alert("Belum ada tiga to-do list yang ditambahkan.");
  }
}
