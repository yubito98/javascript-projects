const task = document.getElementById("task");
const priority = document.getElementById("priority");
const category = document.getElementById("category");
const displayTasks = document.querySelector(".tasks");

let tasks = [];

if(!localStorage.getItem("tasks")){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}else{
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(item =>{
        displayTasks.innerHTML += `
        <li class="row list-group-item list-task-item d-flex justify-content-between ${item.completedClass}">
            <div class="col-12 col-md-6">
                <span class="task-item-value">${item.task}</span>
            </div>
            <div class="task-buttons col-12 col-md-6">
                <span class="task-category badge text-bg-info">${item.category}</span>
                <span class="task-priority badge" >${item.priority}</span>
                <svg class="task-btn task-btn-complete"   width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.16666 13.1366L9.29487 18.2292L20.8333 6.77083" stroke="#00E01A" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg class="task-btn task-btn-delete" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.3023 12.5008L20.0648 17.2633C20.3742 17.5727 20.3742 18.075 20.0648 18.3844L18.3844 20.0648C18.075 20.3742 17.5734 20.3742 17.2633 20.0648L12.5 15.3023L7.73672 20.0648C7.42734 20.3742 6.92578 20.3742 6.61641 20.0648L4.93516 18.3844C4.62578 18.075 4.62578 17.5734 4.93516 17.2633L9.69844 12.5008L4.93516 7.7375C4.62578 7.42813 4.62578 6.92578 4.93516 6.61641L6.61719 4.93594C6.92656 4.62656 7.42813 4.62656 7.7375 4.93594L12.5 9.69922L17.2633 4.93594C17.5727 4.62656 18.0742 4.62656 18.3844 4.93594L20.0648 6.61719C20.3742 6.92656 20.3742 7.42813 20.0648 7.73828L15.3023 12.5008Z" fill="#FF4A4A"/>
                </svg>
        
            </div>
        </li>
        `
    })
}

let totalTasks = document.getElementById("totalTasks");
let displayCompletedTasks = document.getElementById("completedTasks");
let progressBar = document.getElementById("progressBar");
totalTasks.innerHTML = tasks.length

let completedTasks = tasks.filter(item => item.completed);
displayCompletedTasks.innerHTML = completedTasks.length

let progressBarResult = (completedTasks.length / tasks.length) * 100;
progressBar.style.width= `${progressBarResult}%`

function sendTask(event){
    event.preventDefault();
    tasks.push(
        {
            task: task.value, 
            priority: priority.value,
            category: category.value,
            completed: false,
            completedClass:""
        }
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
    tasks = JSON.parse(localStorage.getItem("tasks"));
    window.location.reload()
}


const taskDeleteButtons = document.querySelectorAll(".task-btn-delete");

taskDeleteButtons.forEach(item =>{
    item.addEventListener("click", () =>{
        let taskItem = item.parentNode.parentNode; 
        let taskItemValue = taskItem.querySelector(".task-item-value").innerHTML;
        let index = tasks.findIndex(item => item.task === taskItemValue);
        tasks.splice(index, 1)
        localStorage.setItem("tasks", JSON.stringify(tasks));
        window.location.reload()
    })
})


const taskCompleteButtons = document.querySelectorAll(".task-btn-complete");

taskCompleteButtons.forEach(item => {
    item.addEventListener("click", () =>{
        let taskItem = item.parentNode.parentNode; 
        let taskItemValue = taskItem.querySelector(".task-item-value").innerHTML;
        let index = tasks.findIndex(item => item.task === taskItemValue);
        if(tasks[index].completed){
            tasks[index].completed = false;
            tasks[index].completedClass = "";
        }else{
            tasks[index].completed = true;
            tasks[index].completedClass = "list-group-item-success";
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
        window.location.reload()
    })    
});


function tasksPriority(){
    const tasksPriority = document.querySelectorAll(".task-priority");

    if(tasksPriority){
        tasksPriority.forEach(item =>{
            if(item.innerText == "Alta"){
                item.classList.add("text-bg-danger")
            }else if(item.innerText == "Normal"){
                item.classList.add("text-bg-warning")
            }else if(item.innerText == "Baja"){
                item.classList.add("text-bg-secondary")
            }
        })
    }
}


function handleTaskFilter(event){
    let filterPriority = document.getElementById("filterPriority").value;
    let filterCategory = document.getElementById("filterCategory").value;
    console.log(filterPriority)
    console.log(filterCategory)
   let filterTasks = tasks.filter(item => {
    if(filterPriority && filterCategory){
        return item.priority === filterPriority && item.category === filterCategory;
    }else if(filterPriority){
        return item.priority === filterPriority
    }else if(filterCategory){
        item.category === filterCategory
    }
   });
    displayTasks.innerHTML = "";
    filterTasks.forEach(item =>{
        displayTasks.innerHTML += `
        <li class="list-group-item list-task-item ${item.completedClass}">
            <div>
                <span class="task-item-value">${item.task}</span>
            </div>
            <div class="task-buttons">
                <span class="task-category badge text-bg-info">${item.category}</span>
                <span class="task-priority badge" >${item.priority}</span>
                <svg class="task-btn task-btn-complete"   width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.16666 13.1366L9.29487 18.2292L20.8333 6.77083" stroke="#00E01A" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg class="task-btn task-btn-delete" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.3023 12.5008L20.0648 17.2633C20.3742 17.5727 20.3742 18.075 20.0648 18.3844L18.3844 20.0648C18.075 20.3742 17.5734 20.3742 17.2633 20.0648L12.5 15.3023L7.73672 20.0648C7.42734 20.3742 6.92578 20.3742 6.61641 20.0648L4.93516 18.3844C4.62578 18.075 4.62578 17.5734 4.93516 17.2633L9.69844 12.5008L4.93516 7.7375C4.62578 7.42813 4.62578 6.92578 4.93516 6.61641L6.61719 4.93594C6.92656 4.62656 7.42813 4.62656 7.7375 4.93594L12.5 9.69922L17.2633 4.93594C17.5727 4.62656 18.0742 4.62656 18.3844 4.93594L20.0648 6.61719C20.3742 6.92656 20.3742 7.42813 20.0648 7.73828L15.3023 12.5008Z" fill="#FF4A4A"/>
                </svg>
        
            </div>
        </li>
        `
    })

    tasksPriority()

}

tasksPriority()















