// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// Array para almacenar nombres amigos LISTA!
let amigos = [];

// Función agrega amigo lista
function agregarAmigo() {
    let inputAmigo = document.getElementById("amigo");
    let nombre = inputAmigo.value.trim();

    if (nombre === "") {
        alert("Por favor, ingrese un nombre válido.");
        return;
    }
    if (amigos.includes(nombre)) {
        alert("Ese nombre ya está en la lista.");
        return;
    }

    amigos.push(nombre);
    inputAmigo.value = "";
    actualizarLista();
}

// Función actualizar la list
function actualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach((nombre) => {
        let li = document.createElement("li");
        li.textContent = nombre;
        lista.appendChild(li);
    });
}

// Función para sortear amigo
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Debe haber al menos 2 participantes para el sorteo.");
        return;
    }

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    let amigosMezclados = [...amigos];
    amigosMezclados.sort(() => Math.random() - 0.5);

    for (let i = 0; i < amigosMezclados.length; i++) {
        let asignado = amigosMezclados[(i + 1) % amigosMezclados.length];
        let li = document.createElement("li");
        li.textContent = `${amigosMezclados[i]} → ${asignado}`;
        resultado.appendChild(li);
    }
}
