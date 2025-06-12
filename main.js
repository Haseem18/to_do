const taskInputElement = document.querySelector(".task_input");
const taskAddElement = document.querySelector(".task_add_btn");
const userListElement = document.querySelector(".user_list");
const toDoContainer = document.querySelector(".to_do_container");
const warnMsgElement = document.querySelector(".warn_msg");

const userTaskList = [];
let taskCount = 0;

const showWarning = (msg) => {
    warnMsgElement.style.display = "block";
    warnMsgElement.innerHTML = msg;

    setTimeout(() => {
        warnMsgElement.style.display = "none";
        taskInputElement.value = ""
    }, 2000);
}

const addTask = () => {
    const taskList = document.createElement("li");
    const taskPara = document.createElement("p");
    const taskDelete = document.createElement("button");

    const userTask = taskInputElement.value.trim();

    if (userTask === "") {
        showWarning("Plz Enter Task");
        return;
    }

    const isDuplicate = userTaskList.some((task) => task.toLowerCase() === userTask.toLowerCase());

    if (isDuplicate) {
        showWarning("Do not enter duplicate task");
        return;
    }

    if (taskCount === 10) {
        showWarning("Maximum Size Reached");
        return;
    }

    taskCount++;

    userTaskList.push(userTask);    
    
    taskPara.innerHTML = userTask;
    taskPara.classList.add("task");

    taskInputElement.value = "";

    taskDelete.innerHTML = "Delete";
    taskDelete.classList.add("delete_btn")

    taskList.appendChild(taskPara);
    taskList.appendChild(taskDelete);
    userListElement.appendChild(taskList);

    const deleteTask = () => {
        taskList.remove();
        const removeTask = userTaskList.indexOf(userTask);
        userTaskList.splice(removeTask, 1);
    }

    taskDelete.addEventListener("click", deleteTask);
} 

taskAddElement.addEventListener("click", addTask);

window.addEventListener("load", () => {
    toDoContainer.focus();
})

toDoContainer.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
})