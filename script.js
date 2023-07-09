let todo = [];
let todoList = document.getElementById("all");
let taskUnComplete = document.getElementById("uncomplete");
let taskComplete = document.getElementById("complete");
let input = document.getElementById("text-area");
let counter = document.getElementById("count");
let add_btn = document.getElementsByClassName("add-btn");
let cplt_all = document.getElementById("cplt-all");
let clr_all = document.getElementById("clr-all");

// Alert Toast
function alertToast(text) {
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.innerHTML = text;
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}

// adding task to Dom

function addTaskToDom(task) {
  const li = document.createElement("li");
  li.className = "item";

  li.innerHTML = `
  <div>
  <input type="checkbox" id="${task.id}" ${
    task.complete ? "checked" : ""
  } class="custom-checkbox">
  <label class="custom_css" for="${task.id}">${task.text}</label>
  </div>
  <span id="close" ><i class="fa fa-times-circle" data-class="delete" aria-hidden="true" data-id="${
    task.id
  }"></i></span>
  `;

  todoList.append(li);
}

// Render Task List

function renderList() {
  todoList.innerHTML = "";

  for (let i = 0; i < todo.length; i++) {
    addTaskToDom(todo[i]);
  }
  AllTask();
  uncomplete();
  complete();

  counter.innerText = todo.length;
}

// Toggle Task Complete to Uncomplete

function toggleTask(taskId) {
  const task = todo.filter(function (task) {
    return task.id == taskId;
  });

  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.complete = !currentTask.complete;
    renderList();
    showNotification("Task Completed Successfully");
    return;
  }

  showNotification("Task not completed");
}

// Delete Task

function deleteTask(taskId) {
  const newTodo = todo.filter(function (task) {
    return task.id != taskId;
  });

  todo = newTodo;

  renderList();
  showNotification("Task Deleted Succesfully");
}

// Adding Task

function addTask(task) {
  if (task) {
    todo.push(task);
    renderList();
    showNotification("Task Added Succesfully");
    return;
  }
  showNotification("Task not added");
}

// Show toast alert

function showNotification(text) {
  alertToast(text);
}

// Handle Keypress

function handleInputKeyPress(e) {
  if (e.key == "Enter") {
    const text = e.target.value;

    if (!text) {
      showNotification("Input Field can not be empty");
      return;
    }

    let task = {
      text,
      id: Date.now(),
      complete: false,
    };

    e.target.value = "";
    addTask(task);
  }
}

// Handle Add Button

function inputHandle() {
  const text = input.value;
  console.log(text);

  if (!text) {
    showNotification("Input Field can not be empty");
    return;
  }

  let task = {
    text,
    id: Date.now(),
    complete: false,
  };

  input.value = "";
  addTask(task);
}

// Function Deligation

function handleState(e) {
  const target = e.target;
  if (target.dataset.class == "delete") {
    const taskId = target.dataset.id;
    deleteTask(taskId);
    return;
  } else if (target.className == "custom-checkbox") {
    const taskId = target.id;
    toggleTask(taskId);
    return;
  }
}

input.addEventListener("keyup", handleInputKeyPress);
add_btn[0].addEventListener("click", inputHandle);
document.addEventListener("click", handleState);

// active class toggler

document.querySelectorAll(".links").forEach((ele) =>
  ele.addEventListener("click", function (event) {
    event.preventDefault();
    document
      .querySelectorAll(".links")
      .forEach((ele) => ele.classList.remove("active"));
    this.classList.add("active");
  })
);

// tab toggler

function toggleStatus(e, status) {
  var i, tabcontent;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  document.getElementById(status).style.display = "block";
  e.currentTarget.class += "active";
}

window.onload = function () {
  console.log(document.getElementById("default").click());
};

// function for adding Task to Complete list

function addTaskToCompleteTab(task) {
  const li = document.createElement("li");
  li.className = "item";

  li.innerHTML = `
  <div>
  <input type="checkbox" id="${task.id}" ${
    task.complete ? "checked" : ""
  } class="custom-checkbox">
  <label class="custom_css" for="${task.id}">${task.text}</label>
  </div>
  <span id="close" ><i class="fa fa-times-circle" data-class="delete" aria-hidden="true" data-id="${
    task.id
  }"></i></span>
  `;

  taskComplete.append(li);
}

function complete() {
  taskComplete.innerHTML = "";

  const completeTask = todo.filter(function (task) {
    return task.complete == true;
  });

  if (completeTask.length == 0 || todo.length == 0) {
    var p = document.createElement("p");
    p.className = "empty";
    p.innerHTML = `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i><p class="info-txt">Complete Task to Show Here!</p>`;
    taskComplete.append(p);
  }
  console.log(completeTask.length);
  document.getElementById(
    "comp-counter"
  ).innerHTML = `(${completeTask.length})`;

  for (let i = 0; i < completeTask.length; i++) {
    console.log(completeTask[i]);
    addTaskToCompleteTab(completeTask[i]);
  }
}

complete();

// function for showing uncomplete task in uncomplete tab

// function detection() {}

function showTaskToUnCompleteTab(task) {
  const li = document.createElement("li");
  li.className = "item";

  li.innerHTML = `
  <div>
  <input type="checkbox" id="${task.id}" ${
    task.complete ? "checked" : ""
  } class="custom-checkbox">
  <label class="custom_css" for="${task.id}">${task.text}</label>
  </div>
  <span id="close" ><i class="fa fa-times-circle" data-class="delete" aria-hidden="true" data-id="${
    task.id
  }"></i></span>
  `;

  taskUnComplete.append(li);
}

function uncomplete() {
  taskUnComplete.innerHTML = "";

  const unCompleteTask = todo.filter(function (task) {
    return task.complete == false;
  });

  if (unCompleteTask.length == 0 || todo.length == 0) {
    var p = document.createElement("p");
    p.className = "empty";
    p.innerHTML = `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i><p class="info-txt">Nothing have here to show</p>`;
    taskUnComplete.append(p);
  }

  document.getElementById(
    "un-comp-counter"
  ).innerHTML = `(${unCompleteTask.length})`;

  for (let i = 0; i < unCompleteTask.length; i++) {
    showTaskToUnCompleteTab(unCompleteTask[i]);
  }
}

uncomplete();

function AllTask() {
  if (todo.length == 0) {
    var p = document.createElement("p");
    p.className = "empty";
    p.innerHTML = `<i class="fa fa-exclamation-triangle" aria-hidden="true"></i><p class="info-txt">Here you see All Your Task</p>`;
    todoList.append(p);
  }
}
AllTask();

// Complete and clear All in One Click

function completeAllTask() {
  let task_complete = false;
  const task = todo.filter(function (task) {
    return task.complete == task_complete;
  });

  for (let i = 0; i < task.length; i++) {
    task[i].complete = true;
  }

  renderList();
}

cplt_all.addEventListener("click", completeAllTask);

function clearAllTask() {
  let task_Uncomplete = true;
  const task = todo.filter(function (task) {
    return task.complete == task_Uncomplete;
  });

  console.log(task);

  for (let i = 0; i < task.length; i++) {
    task[i].complete = false;
  }

  renderList();
}

clr_all.addEventListener("click", clearAllTask);
