// Array amigos lista
let amigos = [];

// Función agragar amigos lista
function agregarAmigo() {
    let inputAmigo = document.getElementById("amigo");
    let nombre = inputAmigo.value.trim();

    // Validaciones mejoras
    if (nombre === "") {
        mostrarMensaje("⚠️ Ingresa un nombre válido.", "error");
        return;
    }
    if (amigos.includes(nombre)) {
        mostrarMensaje("⚠️ Ese nombre ya está en la lista.", "error");
        return;
    }

    amigos.push(nombre);
    inputAmigo.value = ""; 
    actualizarLista();
    mostrarMensaje("✅ Nombre agregado con éxito.", "success");
}

// Función para actualizar lista ami
function actualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    if (amigos.length === 0) {
        lista.innerHTML = "<p>No hay nombres en la lista.</p>";
        return;
    }

    amigos.forEach((nombre, index) => {
        let li = document.createElement("li");
        li.textContent = nombre;

        // Botón para eliminar nombre lista
        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.classList.add("btn-delete");
        btnEliminar.onclick = function() {
            eliminarAmigo(index);
        };

        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
}

// Función para eliminar nombre lsta
function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarLista();
    mostrarMensaje("🗑️ Nombre eliminado.", "info");
}

// Función para sorte amigo
function sortearAmigo() {
    if (amigos.length < 2) {
        mostrarMensaje("⚠️ Necesitas al menos 2 amigos para hacer el sorteo.", "error");
        return;
    }

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = ""; // Limpia resul anteriores

    let ganador = amigos[Math.floor(Math.random() * amigos.length)];
    resultado.innerHTML = `<p>🎉 El amigo secreto es: <strong>${ganador}</strong> 🎊</p>`;
}

// Función para mostrar mensajes de error o éxito
function mostrarMensaje(mensaje, tipo) {
    let mensajeDiv = document.getElementById("mensaje");
    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = tipo; 

    setTimeout(() => {
        mensajeDiv.textContent = "";
    }, 3000);
}
