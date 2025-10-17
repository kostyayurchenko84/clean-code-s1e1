//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

var taskInput=document.getElementById("new-task");
var addButton=document.getElementsByTagName("button")[0];
var incompleteTaskHolder=document.getElementById("todo-list");
var completedTasksHolder=document.getElementById("done-tasks");


//New task list item
var createNewTaskElement=function(taskString){

  var listItem=document.createElement("li");
  var checkBox=document.createElement("input");
  var label=document.createElement("label");
  var editInput=document.createElement("input");
  var editButton=document.createElement("button");
  var deleteButton=document.createElement("button");
  var deleteButtonImg=document.createElement("img");
  listItem.className = "list-item";
  label.innerText=taskString;
  label.className = "task-title task__label";
  //Each elements, needs appending
  checkBox.type="checkbox";
  checkBox.className = "task__checkbox";
  editInput.type="text";
  editInput.className="task-input task-title task__input_hidden";
  editButton.innerText="Edit";
  editButton.className="btn edit-task";
  deleteButton.className="btn delete-task";
  deleteButtonImg.className="delete-task__icon";
  deleteButtonImg.src="./remove.svg";
  deleteButton.appendChild(deleteButtonImg);
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



var addTask=function(){
  console.log("Add Task...");
  if (!taskInput.value) return;
  var listItem=createNewTaskElement(taskInput.value);
  
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  
  taskInput.value="";
}

var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");
  
  var listItem=this.parentNode;
  
  var editInput=listItem.querySelector('.task-input');
  var label=listItem.querySelector(".task__label");
  var editBtn=listItem.querySelector(".edit-task");
  var containsClass=listItem.classList.contains("edit-mode");
  
  if(containsClass){
    label.innerText=editInput.value;
    label.classList.remove("task__label_hidden");
    editInput.classList.remove("task__input_visible");
    editInput.classList.add("task__input_hidden");
    editBtn.innerText="Edit";
  }
  else{
    editInput.value=label.innerText;
    label.classList.add("task__label_hidden");
    editInput.classList.remove("task__input_hidden");
    editInput.classList.add("task__input_visible");
    editBtn.innerText="Save";
  }
  
  //toggle .editmode on the parent.
  listItem.classList.toggle("edit-mode");
};

var deleteTask=function(){
  console.log("Delete Task...");
  var listItem=this.parentNode;
  var ul=listItem.parentNode;
  ul.removeChild(listItem);
}

var taskCompleted=function(){
  console.log("Complete Task...");
  var listItem=this.parentNode;
  var label = listItem.querySelector(".task__label"); 
  label.classList.add("task__label_completed");
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);  
}

var taskIncomplete=function(){
  console.log("Incomplete Task...");
  var listItem=this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

addButton.addEventListener("click",addTask);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  var checkBox=taskListItem.querySelector(".task__checkbox");
  var editButton=taskListItem.querySelector(".edit-task");
  var deleteButton=taskListItem.querySelector(".delete-task");
  
  editButton.onclick=editTask;
  deleteButton.onclick=deleteTask;
  checkBox.onchange=checkBoxEventHandler;
}

for (var i=0; i<incompleteTaskHolder.children.length;i++){
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i=0; i<completedTasksHolder.children.length;i++){
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}

//prevent creation of empty tasks.
//Change edit to save when you are in edit mode.