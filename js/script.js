var toDoName = document.getElementById("toDoName");
var toDoDesc = document.getElementById("toDoDesc");
var search = document.getElementById("Search");
var idCount=0;
var toDoList;
var updateIndex;

if (localStorage.getItem("toDoList") == null) {
  toDoList = [];
} else {
  toDoList = JSON.parse(localStorage.getItem("toDoList"));
  idCount=toDoList.length-1;
  displaytoDo(toDoList);
}

function addtoDo() {
  const regexName = /^[A-Z][a-z]{3,8}$/;
  const regexDesc = /^.{1,20}$/;
  if (!regexName.test(toDoName.value)|| !regexDesc.test(toDoDesc.value)) {
    toDoName.style.borderColor = 'red';
    toDoDesc.style.borderColor = 'red';
    document.querySelector("#NameAlert").classList.remove("d-none");
    document.querySelector("#descAlert").classList.remove("d-none");
  } else {
  
    document.querySelector("#NameAlert").classList.add("d-none");
    document.querySelector("#descAlert").classList.add("d-none");
    toDoName.style.borderColor = 'green';
    toDoDesc.style.borderColor = 'green';
    idCount++
    var toDo = {id:idCount, Name: toDoName.value, desc: toDoDesc.value, done: false };
    toDoList.push(toDo);
    displaytoDo(toDoList);
    clearinputs();
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  }
}

function displaytoDo(List) {
  var cartona = "";
  for (var i = 0; i < List.length; i++) {
    const checkedAttr = List[i].done ? "checked" : "";
    const rowClass = List[i].done ? "bg-success" : "";
    cartona += `<tr class="${rowClass}">
        <td>${i + 1}</td>
        <td>${List[i].Name}</td>
        <td>${List[i].desc}</td>
        <td><input type="checkbox" onchange="checkTodo(this, ${i})" value="${i}" ${checkedAttr}></td>
        <td><button class="btn  btn-outline-info" onclick="ubdatetoDo(${i})" type="button">Ubdate</button></td>
        <td><button class="btn btn-outline-danger" onclick="DeletetoDo(${List[i].id})" type="button">Delete</button></td>
      </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

function DeletetoDo(id) {
  var index = toDoList.findIndex(todo => todo.id===id);
  toDoList.splice(index, 1);
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  displaytoDo(toDoList);
}

function searchList(term) {
  var searchProudcts = [];

  for (var i = 0; i < toDoList.length; i++) {
    if (toDoList[i].Name.toLowerCase().includes(term.toLowerCase()) == true) {
      searchProudcts.push(toDoList[i]);
      displaytoDo(searchProudcts);
    }

    console.log(toDoList[i].Name);
  }
}

function ubdatetoDo(index) {
  toDoName.value = toDoList[index].Name;
  toDoDesc.value = toDoList[index].desc;
  document.querySelector("#add-btn").classList.add("d-none");
  document.querySelector("#ubdate-btn").classList.remove("d-none");
  updateIndex = index;
  console.log(updateIndex);
}

function changetoDo() {
  toDoList[updateIndex].Name = toDoName.value;
  toDoList[updateIndex].desc = toDoDesc.value;
  document.querySelector("#add-btn").classList.remove("d-none");
  document.querySelector("#ubdate-btn").classList.add("d-none");
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  displaytoDo(toDoList);
  clearinputs();
}

function clearinputs() {
  toDoName.value = "";
  toDoDesc.value = "";
}

function checkTodo(checkbox, index) {
  toDoList[index].done = checkbox.checked;
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
  const tableBody = document.getElementById("tableBody");
  const row = tableBody.rows[index];

  if (checkbox.checked || toDoList[index].done) {
    row.classList.add("bg-success");
  } else {
    row.classList.remove("bg-success");
  }
}
