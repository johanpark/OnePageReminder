const Todoform = document.querySelector(".js-TodoForm"),
        TodoInput = Todoform.querySelector("input"),
        TodoDate = Todoform.querySelector("input"),
        TodoTime = Todoform.querySelector("input"),
        TodoList = document.querySelector(".js-TodoList");

const  TODO_LS = "Todos";
let TodoArr = [];


function DeleteTodo(event)
{
    const btn = event.target;
    const li = btn.parentNode;
    TodoList.removeChild(li);
    const CleanTodos = TodoArr.filter(function(Todo){
        return Todo.id !== parseInt(li.id);
    });
    TodoArr = CleanTodos;
    SaveTodos();
}

function SaveTodos()
{ 
    localStorage.setItem(TODO_LS, JSON.stringify(TodoArr));
}

function PaintTodo(text, date, time)
{
   
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText ="❌";
    delBtn.addEventListener("click", DeleteTodo);
    const span = document.createElement("span");
    span.innerText = text;
    const newId = TodoArr.length + 1;
    
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id  = newId;
    TodoList.appendChild(li);
    const TodoObj = {
        text : text,
        id : newId,
        };
        TodoArr.push(TodoObj);
        SaveTodos()
}

function HandleSubmit(event)
{
    event.preventDefault();
    const currentVlaue = TodoInput.value;
    const currentDate = TodoDate.value;
    const currentTime = TodoTime.value;
    PaintTodo(currentVlaue, currentDate, currentTime);
    TodoInput.value ="";
}

function loadTodos()
{
    const LoadedTodos = localStorage.getItem(TODO_LS);
    if(LoadedTodos !== null)
    {
       const parsedTodos = JSON.parse(LoadedTodos);
        parsedTodos.forEach(function(Todo){
            PaintTodo(Todo.text);
        });
    }
}

function init()
{
    loadTodos();
    Todoform.addEventListener("submit", HandleSubmit);
}
init();