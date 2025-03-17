// Array para almacenar los nombres de los amigos
let amigos = JSON.parse(localStorage.getItem("amigos")) || [];

// Función para agregar un amigo a la lista
function agregarAmigo() {
    let inputAmigo = document.getElementById("amigo");
    let nombre = inputAmigo.value.trim();

    // Validaciones
    if (nombre === "") {
        mostrarMensaje("⚠️ Ingresa un nombre válido.", "error");
        return;
    }
    if (amigos.includes(nombre)) {
        mostrarMensaje("⚠️ Ese nombre ya está en la lista.", "error");
        return;
    }

    amigos.push(nombre);
    guardarLista(); // Guardar en localStorage
    inputAmigo.value = ""; // Limpiar el input
    actualizarLista();
    mostrarMensaje("✅ Nombre agregado con éxito.", "success");
}

// Función para actualizar la lista de amigos en la página
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

        // Botón para eliminar un nombre de la lista
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

// Función para eliminar un nombre de la lista
function eliminarAmigo(index) {
    amigos.splice(index, 1);
    guardarLista(); // Guardar cambios en localStorage
    actualizarLista();
    mostrarMensaje("🗑️ Nombre eliminado.", "info");
}

// Función para sortear el amigo secreto evitando que una persona se asigne a sí misma
function sortearAmigo() {
    if (amigos.length < 2) {
        mostrarMensaje("⚠️ Necesitas al menos 2 amigos para hacer el sorteo.", "error");
        return;
    }

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = ""; // Limpiar resultados anteriores

    let amigosDisponibles = [...amigos];
    let asignaciones = {};

    amigos.forEach((amigo) => {
        let opciones = amigosDisponibles.filter(a => a !== amigo); // Evita que se asigne a sí mismo

        if (opciones.length === 0) {
            return sortearAmigo(); // Si no hay opciones válidas, repetir el sorteo
        }

        let indiceAleatorio = Math.floor(Math.random() * opciones.length);
        let asignado = opciones[indiceAleatorio];

        asignaciones[amigo] = asignado;
        amigosDisponibles = amigosDisponibles.filter(a => a !== asignado);
    });

    // Mostrar los resultados
    for (let [amigo, asignado] of Object.entries(asignaciones)) {
        let li = document.createElement("li");
        li.innerHTML = `🎁 ${amigo} → <strong>${asignado}</strong>`;
        resultado.appendChild(li);
    }
}

// Función para guardar la lista en localStorage
function guardarLista() {
    localStorage.setItem("amigos", JSON.stringify(amigos));
}

// Función para mostrar mensajes en la pantalla
function mostrarMensaje(mensaje, tipo) {
    let mensajeDiv = document.getElementById("mensaje");
    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = tipo; // Aplica clases CSS según el tipo de mensaje

    setTimeout(() => {
        mensajeDiv.textContent = "";
    }, 3000);
}

// Recuperar la lista al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    actualizarLista();
});
