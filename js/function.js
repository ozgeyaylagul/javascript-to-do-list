let listDOM = document.querySelector("#list");
// the array to store all tasks
let tasks = [];

// add new item to the list when click "Add" button
// show success or error message by testing input value is empty or not
const newElement = () => {
  let task = document.querySelector("#task");
  if (task.value && !/^\s*$/.test(task.value)) {
    tasks.push(task.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    addItem(task.value);
    $(".success").toast("show");
  } else {
    $(".error").toast("show");
  }
  task.value = "";
};

// the method to add new item to the list
const addItem = (task) => {
  let liDOM = document.createElement("li");
  liDOM.innerHTML = `${task}<span onclick="removeItem" class="close">&times;</span>`;
  liDOM.setAttribute("onclick", "checkedItem");
  listDOM.append(liDOM);
};

// the method to remove item from the list
const removeItem = (e) => {
  if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    let index = tasks.indexOf(e.target.parentElement.innerText.slice(0, -1));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};
listDOM.addEventListener("click", removeItem);

// add to checked class to the item when clicked
const checkedItem = (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  }
};
listDOM.addEventListener("click", checkedItem);

// if there is any item in the local storage, add them to the task list
const getLocalStorage = () => {
  localStorage.getItem("tasks")
    ? (tasks = JSON.parse(localStorage.getItem("tasks")))
    : (tasks = []);
  tasks.forEach((task) => {
    addItem(task);
  });
};

getLocalStorage();
