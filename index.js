$(document).on("ready", function () {
  showTodos();

  $("#add").on("click", function () {
    $("#updateTodo").hide();
  });

  $("#saveTodo").on("click", function addItem() {
    let inputText = $("#inputText").val();
    if (inputText === "") {
      alert("Ingresa un todo para poder guardar");
      $("#saveTodo").show();
      $("#updateTodo").show();
      return;
    }
    addItemToLocalStorage(inputText);
    showTodos();
    $("#inputText").val("");
  });

  $("#updateTodo").on("click", function addItem() {
    let inputText = $("#inputText").val();
    let id = $("#inputText").attr("data-id");
    if (inputText === "") {
      alert("Ingresa un todo para poder actualizar");
      $("#saveTodo").show();
      $("#updateTodo").show();
      return;
    }
    editItemOnLocalStorage(inputText, id);
    showTodos();
    $("#inputText").val("");
  });

  $("#cancel").on("click", function () {
    $("#inputText").val("");
    $.mobile.navigate("#home");
    if ($("#saveTodo").hide()) {
      $("#saveTodo").show();
    }
    if ($("#updateTodo").hide()) {
      $("#updateTodo").show();
    }
  });

  $(".edit").on("click", function () {
    let editItem = $(this).attr("data-value");
    let id = $(this).attr("data-id");
    $("#inputText").val(editItem);
    oldId = $("#inputText").attr("data-id", id);
    oldId = id;
    console.log(oldId);
    $.mobile.navigate("#add");
    $("#saveTodo").hide();
  });

  $(".delete").on("click", function () {
    let editItem = $(this).attr("data-value");
    let id = $(this).attr("data-id");
    $("#inputText").val(editItem);
    oldId = $("#inputText").attr("data-id", id);
    oldId = id;
    console.log(oldId);
    removeItem(id);
  });
});

// creacion de item
function addItemToLocalStorage(inputText) {
  let todos = getItemFromLocalStorage();
  if (!todos) {
    let items = [];
    items.push(inputText);
    localStorage.setItem("todos", toJson(items));
    return;
  }
  todos.push(inputText);
  localStorage.setItem("todos", toJson(todos));
}

//eliminado de item
function removeItem(id) {
  let todos = getItemFromLocalStorage();
  if (todos.length === 1) {
    localStorage.removeItem("todos");
    reloadPage();
  } else {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i] === todos[id]) {
        todos.splice(i, 1);
      }
    }
    localStorage.removeItem("todos");
    localStorage.setItem("todos", toJson(todos));
    reloadPage();
  }
  reloadPage();
  return;
}

//edici??n de item
function editItemOnLocalStorage(inputText, id) {
  let todos = getItemFromLocalStorage();
  todos[id] = inputText;
  localStorage.removeItem("todos");
  localStorage.setItem("todos", toJson(todos));
  return;
}

//recarga de p??gina forzada
function reloadPage() {
  if (!localStorage.getItem("reload")) {
    localStorage.setItem("reload", "true");
    location.reload();
  } else {
    localStorage.removeItem("reload");
  }
}

//stringify
function toJson(arr) {
  return JSON.stringify(arr);
}

//obtener items del localstorage
function getItemFromLocalStorage() {
  let todos = window.localStorage.getItem("todos");
  if (!todos) return;
  return JSON.parse(todos);
}

//mostrar items
function showTodos() {
  let todos = getItemFromLocalStorage();
  console.log(todos);
  if (!todos) {
    return $("#todos").append(
      "<div><p class='todoParagraph todoEmpty'>Ac?? aparecer??n todas las tareas que agregues. Toc?? el bot??n Agregar tarea para a??adir una nueva.</p></div>"
    );
  }
  $("#todos").empty();
  $.each(todos, function (index, value) {
    $("#todos").append(
      `<div class="todoContainer">
      <div class="leftItemContainer">
      <p class="todoParagraph">${value}</p>
      </div>
      <div class="buttonsContainer"> <button data-value="${value}" data-id="${index}" class="edit"><img src="assets/images/edit-icon.png"/></button><button data-value="${value}" data-id="${index}" class="delete"><img src="assets/images/delete-icon.png"/></button></div>
      </div>`
    );
  });
  reloadPage();
}
