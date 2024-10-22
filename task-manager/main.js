const task = document.getElementById("task");
const priority = document.getElementById("priority");
const displayTasks = document.querySelector(".tasks")

let tasks = [];


if(!localStorage.getItem("tasks")){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}else{
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(item =>{
        displayTasks.innerHTML += `
        <li class="list-group-item list-task-item">
        <div>
            <span class="task-item-value">${item.task}</span>
            <span>${item.priority}</span> 
        </div>
        <div>
        <button class="btn btn-success">Check</button>
        <button onclick="deleteTask(event)" class="btn btn-danger">X</button>
        </div>
        </li>
        `
    })
}


function sendTask(event){
    event.preventDefault();
    tasks.push({task: task.value, priority: priority.value });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    tasks = JSON.parse(localStorage.getItem("tasks"));
    window.location.reload()
}


function deleteTask(event){
    event.preventDefault();
    let taskItem = event.target.parentNode; 
    let taskItemValue = taskItem.querySelector(".task-item-value");
    let index = tasks.findIndex(item => item.name === taskItemValue);
    tasks.splice(index, 1)
    localStorage.setItem("tasks", JSON.stringify(tasks));
    window.location.reload()
}







