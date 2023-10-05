// Obtener referencias a elementos HTML
const itemInput = document.getElementById("item");
const agregarItemButton = document.getElementById("addItem");
const listaDeCompras = document.getElementById("listaDeCompras");

// Arreglo para almacenar elementos de la lista de compras
let items = [];

// Función para agregar un elemento a la lista
function agregarItem() {
    const nuevoItem = itemInput.value.trim();
    if (nuevoItem === "") {
        mostrarError("El campo de entrada no puede estar vacío.");
    } else {
        items.push({ text: nuevoItem, completado: false, noDisponible: false });
        guardarListaaLocalStorage();
        renderizarLista();
        itemInput.value = "";
    }
}

// Función para editar un elemento
function editarItem(index, newText) {
    items[index].text = newText;
    guardarListaaLocalStorage();
    renderizarLista();
}

// Función para eliminar un elemento
function borrarItem(index) {
    items.splice(index, 1);
    guardarListaaLocalStorage();
    renderizarLista();
}

// Función para cambiar el estado de completado de un elemento
function cambiarACompleto(index) {
    items[index].completado = !items[index].completado;
    guardarListaaLocalStorage();
    renderizarLista();
}

// Función para cambiar el estado de No Disponible de un elemento
function cambiarANoDisponible(index) {
    items[index].noDisponible = !items[index].noDisponible;
    guardarListaaLocalStorage();
    renderizarLista();
}

// Función para renderizar la lista de compras
function renderizarLista() {
    listaDeCompras.innerHTML = "";
    items.forEach((item, index) => {
        const li = document.createElement("li");
        const checkboxcompletado = document.createElement("input");
        checkboxcompletado.type = "checkbox";
        checkboxcompletado.checked = item.completado;
        checkboxcompletado.addEventListener("change", () => cambiarACompleto(index));

        const checkboxNoDispponible = document.createElement("input");
        checkboxNoDispponible.type = "checkbox";
        checkboxNoDispponible.checked = item.noDisponible;
        checkboxNoDispponible.addEventListener("change", () => cambiarANoDisponible(index));

        const inputEditar = document.createElement("input");
        inputEditar.type = "text";
        inputEditar.value = item.text;
        inputEditar.addEventListener("blur", () => editarItem(index, inputEditar.value));

        const botonBorrar = document.createElement("button");
        botonBorrar.textContent = "Borrar";
        botonBorrar.addEventListener("click", () => borrarItem(index));

        li.appendChild(checkboxcompletado);
        li.appendChild(checkboxNoDispponible);
        li.appendChild(inputEditar);
        li.appendChild(botonBorrar);

        if (item.completado) {
            li.classList.add("completado");
        }

        if (item.noDisponible) {
            li.classList.add("no-disponible");
        }

        listaDeCompras.appendChild(li);
    });
}

// Función para guardar la lista en LocalStorage
function guardarListaaLocalStorage() {
    localStorage.setItem("listaDeCompras", JSON.stringify(items));
}

// Cargar la lista desde LocalStorage cuando la página se carga
function cargarListadeLocalStorage() {
    const listaGuardada = localStorage.getItem("listaDeCompras");
    if (listaGuardada) {
        items = JSON.parse(listaGuardada);
    }
}

function mostrarError(mensaje) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error";
    errorDiv.textContent = mensaje;
    
    // Inserta el mensaje de error antes del campo de entrada
    const appDiv = document.getElementById("app");
    appDiv.insertBefore(errorDiv, itemInput);
    
    // Borra el mensaje de error después de unos segundos
    setTimeout(() => {
        appDiv.removeChild(errorDiv);
    }, 3000); // Elimina el mensaje después de 3 segundos (puedes ajustar este valor)
}
// Agregar un evento de carga de lista cuando la página se carga
window.addEventListener("load", () => {
    cargarListadeLocalStorage();
    renderizarLista();
});

// Agregar un evento de clic al botón "Agregar"
agregarItemButton.addEventListener("click", agregarItem);

// Permitir a los usuarios presionar Enter en el campo de entrada para agregar elementos
itemInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        agregarItem();
    }
});
