
let productos = [
    { nombre: "Manual Daggerheart (NOVEDAD!)", precio: 85000 }, 
    { nombre: "Catan", precio: 62000 },
    { nombre: "Sagrada", precio: 48000 },
    { nombre: "Clank!", precio: 71000 },
    { nombre: "Manual Cosmere", precio: 79000 },
    { nombre: "Boosters Magic The Gathering", precio: 9500 },
    { nombre: "Boosters Flesh and Blood", precio: 8800 },
    { nombre: "Boosters One Piece TCG", precio: 7500 },
    { nombre: "Set de dados para rol", precio: 12000 },
    { nombre: "Set de dados para Vampiro", precio: 18000 },
    { nombre: "Fundas Dragon Shield x100 color negro", precio: 11500 },
    { nombre: "Torre para dados", precio: 35000 }
];

let carrito = [];

const CLAVE_CARRITO = "carrito";

function guardarCarrito(){
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function cargarCarrito(){
    let guardado = localStorage.getItem(CLAVE_CARRITO);

    if (guardado){
        carrito = JSON.parse(guardado);
    }
}

function agregarProducto(producto){
    carrito.push(producto);
    console.log(producto.nombre + " agregado al carrito");

    actualizarCarrito();
}

function calcularTotal(){
    let total = 0;

    for (let producto of carrito){
        total += producto.precio;
    }

    return total;
}

function mostrarCarrito(){
    console.log("Productos del carrito:");

    for (let producto of carrito){
        console.log(producto.nombre + " - $" + producto.precio);
    }
}


function mostrarProductos(){
    let lista = document.getElementById("listaProductos");
    lista.innerHTML = "";

    for (let i = 0; i < productos.length; i++){
        let producto = productos[i];

        let item = document.createElement("li");
        item.className = "itemProducto";

        item.innerHTML =
            "<span class='nombreProducto'>" + producto.nombre + "</span>" +
            "<span class='precioProducto'>$" + producto.precio + "</span>" +
            "<button class='agregarBoton' data-indice='" + i + "'>Agregar</button>";

        lista.appendChild(item);
    }

    
    let botones = document.querySelectorAll(".agregarBoton");

    for (let boton of botones){
        boton.addEventListener("click", function (){
            let indice = boton.getAttribute("data-indice");
            agregarProducto(productos[indice]);
        });
    }
}


function quitarProducto(i){
    let producto = carrito[i];
    carrito.splice(i, 1);
    console.log(producto.nombre + " voló del carrito");

    actualizarCarrito();
}


function vaciarCarrito() {
    carrito = [];
    console.log("Carrito limpio y vacío");

    actualizarCarrito();
}

function actualizarCarrito() {
    let listaCarrito = document.getElementById("itemsCarrito");
    let totalTexto = document.getElementById("precioFinal");
    let cantidadTexto = document.getElementById("cantidadCarrito");

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<li class='carritoVacio'>Tu carrito está vacío, solo y con frío. Ponele algo, dale copate.</li>";
    } else {
        for (let i = 0; i < carrito.length; i++) {
            let producto = carrito[i];

            let item = document.createElement("li");
            item.className = "itemCarrito";

            item.innerHTML =
                "<span>" + producto.nombre + "</span>" +
                "<span class='precioCarrito'>$" + producto.precio + "</span>" +
                "<button class='quitarBoton' data-indice='" + i + "'>✕</button>";

            listaCarrito.appendChild(item);
        }

        let botonesQuitar = document.querySelectorAll(".quitarBoton");

        for (let boton of botonesQuitar) {
            boton.addEventListener("click", function (){
                let indice = boton.getAttribute("data-indice");
                quitarProducto(indice);
            });
        }
    }

    totalTexto.textContent = "$" + calcularTotal();
    cantidadTexto.textContent = carrito.length;

    guardarCarrito();

    mostrarCarrito();
}


function finalizarCompra(){
    if (carrito.length === 0) {
        Swal.fire({
            icon: "info",
            title: "Tu carrito está seco",
            text: "Dale, meté un par de productos.",
            confirmButtonColor: "#FF653F"
        });
        return;
    }

    Swal.fire({
        icon: "success",
        title: "¡Gracias por tu compra!",
        html:
            "Total a pagar: <strong>$" + calcularTotal() + "</strong><br><br>" +
            "<small>El pago es solo una demostración, no se procesa ningún cobro.</small>",
        confirmButtonText: "Cerrar",
        confirmButtonColor: "#FF653F"
    });
}

document.addEventListener("DOMContentLoaded", function (){
    cargarCarrito();

    mostrarProductos();
    actualizarCarrito();

    let botonVaciar = document.getElementById("botonVaciar");
    let botonPagar = document.getElementById("botonPagar");

    botonVaciar.addEventListener("click", vaciarCarrito);
    botonPagar.addEventListener("click", finalizarCompra);
});