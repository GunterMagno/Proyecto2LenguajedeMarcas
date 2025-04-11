/* ---------------------------
    Alternar modo Claro/Oscuro
    --------------------------
* */
function toggleTheme() {
    const currentTheme = document.documentElement; // Referencia al <html>
    const themeIcon = document.getElementById('theme-icon'); // Referencia al ícono del tema

    // Si el tema actual es oscuro, cambia a claro
    if (currentTheme.getAttribute('data-theme') === 'dark') {
        currentTheme.setAttribute('data-theme', 'light');
        // Cambiar el Icono a la luna sin rellenar
        themeIcon.src = 'img/luna.png';
        themeIcon.alt = 'Modo Oscuro';
        // Guardar la preferencia en localStorage
        localStorage.setItem('theme', 'light');
    } else {
        // Si el tema actual es claro, cambia a oscuro
        currentTheme.setAttribute('data-theme', 'dark');
        // Cambiar el Icono a luna rellena
        themeIcon.src = 'img/luna-rellena.png';
        themeIcon.alt = 'Modo Claro';
        // Guardar la preferencia en localStorage
        localStorage.setItem('theme', 'dark');
    }
}

// Función para comprobar el estado del modo oscuro al cargar la página
function comprobarModoOscuro() {
    const modoGuardado = localStorage.getItem('theme'); // Modo que esta actualmente activo
    const themeIcon = document.getElementById('theme-icon'); // Icono del tema

    // Si el modo oscuro está activado en localStorage, aplicarlo
    if (modoGuardado === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.src = 'img/luna-rellena.png';
        themeIcon.alt = 'Modo Claro';
    } else {
        // Si no, mantiene el modo claro
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.src = 'img/luna.png';
        themeIcon.alt = 'Modo Oscuro';
    }
}

// Llamar a la funcion cuando la pagina se cargue para aplicar el tema guardado
window.onload = comprobarModoOscuro;

// Al hacer clic al botón de cambio de tema
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById('toggle-dark-mode');
    toggleButton.addEventListener("click", (event) => {
        event.preventDefault(); // Evitar que el enlace con href="#" recargue la página
        toggleTheme(); // Cambiar el tema
    });
});


/* ---------------------
    Slider con animacion
    --------------------
* */
// Selección de elementos del DOM
const sliderTestimonios = document.querySelector('.slider-testimonios');
const testimonios = document.querySelectorAll('.testimonio');
const botonAnterior = document.querySelector('.boton-slider-anterior');
const botonSiguiente = document.querySelector('.boton-slider-siguiente');

let indiceActual = 0;

// Para mover el slider segun la dirrecion
const moverSlider = (direccion) => {
    if (direccion === 'siguiente') {
        indiceActual = (indiceActual + 1) % testimonios.length;
    } else if (direccion === 'anterior') {
        indiceActual = (indiceActual - 1 + testimonios.length) % testimonios.length; //Para que no haya problema con los negativos
    }

    // Calcular desplazamiento
    const desplazamiento = -indiceActual * (testimonios[0].offsetWidth + 32);
    sliderTestimonios.style.transform = `translateX(${desplazamiento}px)`;
};

// Event listeners con los botones
if (botonSiguiente !== null && botonAnterior !== null) {
    botonSiguiente.addEventListener('click', () => moverSlider('siguiente'));
    botonAnterior.addEventListener('click', () => moverSlider('anterior'));
}

// Uso de setInterval para animacion automaticamente
setInterval(() => moverSlider('siguiente'), 5000);

// Para que funcione tambien con las flechas del teclado
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        moverSlider('siguiente');
    } else if (event.key === 'ArrowLeft') {
        moverSlider('anterior');
    }
});


/* ---------------------
    Galeria Interactiva
    --------------------
* */
document.addEventListener('DOMContentLoaded', () => {
    // Cargar las imágenes almacenadas al cargar la página
    const imagenesGuardadas = JSON.parse(localStorage.getItem('imagenes')) || [];

    // Añadir las imágenes guardadas a la galería
    imagenesGuardadas.forEach(url => {
        agregarImagen(url);
    });

    // Función para agregar una imagen a la galería
    function agregarImagen(url) {
        const nuevaImagen = document.createElement('div');
        nuevaImagen.classList.add('imagen-contenedor');

        const imagen = document.createElement('img');
        imagen.src = url;
        imagen.alt = 'Imagen dinámica';
        imagen.onerror = () => {
            alert('Error al cargar la imagen. Verifica la URL.');
        };

        const botonEliminar = document.createElement('button'); //Boton para quitar imagenes
        botonEliminar.classList.add('eliminar-imagen');
        botonEliminar.innerHTML = `<img src="img/x.png" alt="Eliminar Imagen">`;

        botonEliminar.addEventListener('click', () => {
            nuevaImagen.remove();
            eliminarImagen(url);
        });

        nuevaImagen.appendChild(imagen);
        nuevaImagen.appendChild(botonEliminar);
        document.querySelector('.galeria').appendChild(nuevaImagen);
    }

    // Función para eliminar una imagen del almacenamiento local
    function eliminarImagen(url) {
        const imagenesGuardadas = JSON.parse(localStorage.getItem('imagenes')) || [];
        const nuevasImagenes = imagenesGuardadas.filter(imagen => imagen !== url);
        localStorage.setItem('imagenes', JSON.stringify(nuevasImagenes));
    }

    // Añadir evento al botón de añadir imagen
    document.getElementById('añadir-imagen').addEventListener('click', () => {
        const url = document.getElementById('url-imagen').value.trim();

        if (url) {
            agregarImagen(url);
            // Guardar la URL en localStorage
            const imagenesGuardadas = JSON.parse(localStorage.getItem('imagenes')) || [];
            imagenesGuardadas.push(url);
            localStorage.setItem('imagenes', JSON.stringify(imagenesGuardadas));

            document.getElementById('url-imagen').value = ''; // Limpiar el input
        } else {
            alert('Por favor, introduce una URL válida.');
            // Tiene que ser un enlade dandole click derecho en copiar dirrecion de imagen, No copiar direccion de enlace
        }
    });
});



/* ----------------------------------
    Pop-Up con busqueda a tiempo real
    ---------------------------------
* */
const barraBusqueda = document.querySelector('.input-busqueda'); // Barra de búsqueda del header
const productos = document.querySelectorAll('.producto'); // Todos los productos
const productos1 = document.querySelectorAll('.producto1'); // Todos los productos1

// Crear el pop-up para mostrar los resultados
const popupResultados = document.createElement('div');
popupResultados.style.position = 'fixed';
popupResultados.style.top = '50%';
popupResultados.style.left = '50%';
popupResultados.style.width = '60%';
popupResultados.style.height = '70%';
popupResultados.style.transform = 'translate(-50%, -50%)';
popupResultados.style.backgroundColor = 'white';
popupResultados.style.padding = '20px';
popupResultados.style.boxShadow = '0px 0px 20px rgba(0,0,0,0.5)';
popupResultados.style.overflowY = 'auto';
popupResultados.style.display = 'none';
popupResultados.style.zIndex = '1000';
popupResultados.style.borderRadius = '10px';
document.body.appendChild(popupResultados);

// Título del pop-up
const tituloPopup = document.createElement('h3');
tituloPopup.style.textAlign = 'center';
tituloPopup.style.marginBottom = '10px';
popupResultados.appendChild(tituloPopup);

// Contenedor interno para productos
const contenidoPopup = document.createElement('div');
contenidoPopup.style.display = 'flex';
contenidoPopup.style.flexWrap = 'wrap';
contenidoPopup.style.gap = '10px';
contenidoPopup.style.justifyContent = 'center';
popupResultados.appendChild(contenidoPopup);

// Función para filtrar productos y mostrar pop-up
function mostrarResultados() {
    const textoBusqueda = barraBusqueda.value.trim().toLowerCase();
    contenidoPopup.innerHTML = '';
    let contador = 0;

    productos.forEach(producto => {
        const nombreProducto = producto.querySelector('p').textContent.toLowerCase();
        if (nombreProducto.includes(textoBusqueda)) {
            const productoClonado = producto.cloneNode(true);
            productoClonado.style.maxWidth = '400px';
            productoClonado.style.width = '100%';
            contenidoPopup.appendChild(productoClonado);
            contador++;
        }
    });

    productos1.forEach(producto => {
        const nombreProducto = producto.querySelector('p').textContent.toLowerCase();
        if (nombreProducto.includes(textoBusqueda)) {
            const productoClonado = producto.cloneNode(true);
            productoClonado.style.maxWidth = '400px';
            productoClonado.style.width = '100%';
            contenidoPopup.appendChild(productoClonado);
            contador++;
        }
    });

    if (contador > 0) {
        tituloPopup.textContent = `Resultados de la búsqueda: "${barraBusqueda.value}" (${contador} encontrados)`;
        popupResultados.style.display = 'block';
    } else {
        popupResultados.style.display = 'none';
    }
}

barraBusqueda.addEventListener('input', mostrarResultados);

barraBusqueda.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evitar recarga de la página
        mostrarResultados();
    }
});

// Cerrar pop-up al hacer clic fuera
window.addEventListener('click', (event) => {
    if (!popupResultados.contains(event.target) && event.target !== barraBusqueda) {
        popupResultados.style.display = 'none';
    }
});



/* ------------------------
    Validacion cuestionario
    -----------------------
* */
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-contacto');

    // Función para mostrar un mensaje de error utilizando `alert()`
    function mostrarMensajeError(mensaje) {
        alert('Error: ' + mensaje);
    }

    // Función para mostrar un mensaje de éxito utilizando `alert()`
    function mostrarMensajeExito() {
        alert('¡Formulario enviado con éxito!');
    }

    // Validación de los campos del formulario
    formulario.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevenir el envío del formulario por defecto para poder validarlo

        let validado = true;
        let errorMessages = [];

        // Validar el campo "nombre"
        const nombre = document.getElementById('nombre');
        if (nombre.value.trim() === '') {
            validado = false;
            errorMessages.push('El campo "Nombre" es obligatorio.');
            nombre.style.border = '2px solid red';
        } else {
            nombre.style.border = '2px solid green';
        }

        // Validar el campo "email"
        const email = document.getElementById('email');
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email.value.trim())) {
            validado = false;
            errorMessages.push('Por favor, introduce un correo electrónico válido.');
            email.style.border = '2px solid red';
        } else {
            email.style.border = '2px solid green';
        }

        // Validar el campo "telefono"
        const telefono = document.getElementById('telefono');
        const telefonoRegex = /^[0-9]{9}$/;
        if (!telefonoRegex.test(telefono.value.trim())) {
            validado = false;
            errorMessages.push('Por favor, introduce un número de teléfono válido (10 dígitos).');
            telefono.style.border = '2px solid red';
        } else {
            telefono.style.border = '2px solid green';
        }

        // Validar el campo "mensaje"
        const mensaje = document.getElementById('mensaje');
        if (mensaje.value.trim() === '') {
            validado = false;
            errorMessages.push('El campo "Mensaje" no puede estar vacío.');
            mensaje.style.border = '2px solid red';
        } else {
            mensaje.style.border = '2px solid green';
        }

        // Validar el campo "direccion"
        const direccion = document.getElementById('direccion');
        if (direccion.value.trim() === '') {
            validado = false;
            errorMessages.push('El campo "Dirección" es obligatorio.');
            direccion.style.border = '2px solid red';
        } else {
            direccion.style.border = '2px solid green';
        }

        // Validar el campo "fecha"
        const fecha = document.getElementById('fecha');
        if (fecha.value.trim() === '') {
            validado = false;
            errorMessages.push('El campo "Fecha de contacto" es obligatorio.');
            fecha.style.border = '2px solid red';
        } else {
            fecha.style.border = '2px solid green';
        }

        // Mostrar mensajes de error si no es válido
        if (!validado) {
            mostrarMensajeError(errorMessages.join(' '));
        } else {
            mostrarMensajeExito();
            formulario.reset(); // Limpiar el formulario si es exitoso
        }
    });

    // Validación en tiempo real: cambiar el borde al escribir
    formulario.addEventListener('input', (event) => {
        const input = event.target;

        if (input.checkValidity()) {
            input.style.border = '2px solid green'; // Borde verde si es válido
        } else {
            input.style.border = '2px solid red'; // Borde rojo si es inválido
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('.form-config form');

    // Función para mostrar un mensaje de error utilizando `alert()`
    function mostrarMensajeError(mensaje) {
        alert('Error: ' + mensaje);
    }

    // Función para mostrar un mensaje de éxito utilizando `alert()`
    function mostrarMensajeExito() {
        alert('¡Cambios guardados con éxito!');
    }

    // Validación de los campos del formulario
    document.querySelector('.boton-guardar-cambios').addEventListener('click', (event) => {
        event.preventDefault(); // Prevenir el envío del formulario por defecto para poder validarlo

        let validado = true;
        let errorMessages = [];

        // Validar el campo "nombre-usuario"
        const nombreUsuario = document.getElementById('nombre-usuario');
        if (nombreUsuario.value.trim() === '') {
            validado = false;
            errorMessages.push('El campo "Nombre Usuario" es obligatorio.');
            nombreUsuario.style.border = '2px solid red';
        } else {
            nombreUsuario.style.border = '2px solid green';
        }

        // Validar el campo "nombre"
        const nombre = document.getElementById('nombre');
        if (nombre.value.trim() === '') {
            validado = false;
            errorMessages.push('El campo "Nombre" es obligatorio.');
            nombre.style.border = '2px solid red';
        } else {
            nombre.style.border = '2px solid green';
        }

        // Validar el campo "apellidos"
        const apellidos = document.getElementById('apellidos');
        if (apellidos.value.trim() === '') {
            validado = false;
            errorMessages.push('El campo "Apellidos" es obligatorio.');
            apellidos.style.border = '2px solid red';
        } else {
            apellidos.style.border = '2px solid green';
        }

        const emailCuenta = document.getElementById('email');
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(emailCuenta.value.trim())) {
            validado = false;
            errorMessages.push('Por favor, introduce un correo electrónico válido.');
            emailCuenta.style.border = '2px solid red';
        } else {
            emailCuenta.style.border = '2px solid green';
        }

        // Validar el campo "fecha-nacimiento"
        const fechaNacimiento = document.getElementById('fecha-nacimiento');
        if (fechaNacimiento.value.trim() === '') {
            validado = false;
            errorMessages.push('El campo "Fecha de Nacimiento" es obligatorio.');
            fechaNacimiento.style.border = '2px solid red';
        } else {
            fechaNacimiento.style.border = '2px solid green';
        }

        // Validar el campo "direccion"
        const direccion = document.getElementById('direccion');
        if (direccion.value.trim() === '') {
            validado = false;
            errorMessages.push('El campo "Dirección" es obligatorio.');
            direccion.style.border = '2px solid red';
        } else {
            direccion.style.border = '2px solid green';
        }

        // Validar el campo "contraseña-antigua"
        const contraseniaAntigua = document.getElementById('contraseña-antigua');
        if (contraseniaAntigua.value.trim() === '') {
            validado = false;
            errorMessages.push('El campo "Contraseña Antigua" es obligatorio.');
            contraseniaAntigua.style.border = '2px solid red';
        } else {
            contraseniaAntigua.style.border = '2px solid green';
        }

        // Validar el campo "contraseña-nueva"
        const contraseniaNueva = document.getElementById('contraseña-nueva');
        if (contraseniaNueva.value.trim() === '') {
            validado = false;
            errorMessages.push('El campo "Contraseña Nueva" es obligatorio.');
            contraseniaNueva.style.border = '2px solid red';
        } else {
            contraseniaNueva.style.border = '2px solid green';
        }

        // Mostrar mensajes de error si no es válido
        if (!validado) {
            mostrarMensajeError(errorMessages.join(' '));
        } else {
            mostrarMensajeExito();
            formulario.reset(); // Limpiar el formulario si es exitoso
        }
    });

    // Validación en tiempo real: cambiar el borde al escribir
    formulario.addEventListener('input', (event) => {
        const input = event.target;

        if (input.checkValidity()) {
            input.style.border = '2px solid green'; // Borde verde si es válido
        } else {
            input.style.border = '2px solid red'; // Borde rojo si es inválido
        }
    });

    // Botón de cancelar: limpiar el formulario
    document.querySelector('.boton-cancelar').addEventListener('click', () => {
        formulario.reset(); // Limpiar el formulario
        const inputs = formulario.querySelectorAll('input');
        inputs.forEach(input => {
            input.style.border = ''; // Restablecer el borde
        });
    });
});


/* -------------------
    Cesta interactiva
   -------------------
* */

// Crear el popup de la cesta
function crearPopupCesta() {
    const popup = document.createElement('div');
    popup.id = 'popup-cesta';
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.right = '-35%';
    popup.style.width = '35%';
    popup.style.height = '100vh';
    popup.style.backgroundColor = '#f8f8f8';
    popup.style.padding = '20px';
    popup.style.borderRadius = '5px 0 0 5px';
    popup.style.zIndex = '1000';
    popup.style.overflowY = 'auto';
    popup.style.transition = 'right 0.3s ease';
    popup.style.boxShadow = '-5px 0 15px rgba(0,0,0,0.1)';
    popup.style.borderLeft = '1px solid #ddd';
    document.body.appendChild(popup);

    return popup;
}

// Crear el título de la cesta
function crearTituloCesta(popup) {
    const titulo = document.createElement('h3');
    titulo.style.textAlign = 'center';
    titulo.style.margin = '0 0 20px 0';
    titulo.style.paddingBottom = '15px';
    titulo.style.borderBottom = '2px solid #e1e1e1';
    titulo.style.color = '#333';
    titulo.style.fontSize = '1.5em';
    titulo.textContent = 'Tu Cesta de Compra';
    popup.appendChild(titulo);

    return titulo;
}

// Crear botón para cerrar la cesta
function crearBotonCerrar(titulo, popup) {
    const boton = document.createElement('button');
    boton.innerHTML = '×';
    boton.style.position = 'absolute';
    boton.style.top = '15px';
    boton.style.right = '15px';
    boton.style.background = 'none';
    boton.style.border = 'none';
    boton.style.fontSize = '28px';
    boton.style.color = '#666';
    boton.style.cursor = 'pointer';

    boton.addEventListener('click', () => {
        popup.style.right = '-35%';
        guardarCesta();
    });

    titulo.appendChild(boton);
}

// Crear contenedor de productos
function crearContenedorProductos(popup) {
    const contenedor = document.createElement('div');
    contenedor.id = 'productos-cesta';
    contenedor.style.maxHeight = 'calc(100vh - 250px)';
    contenedor.style.overflowY = 'auto';
    contenedor.style.padding = '0 15px';
    contenedor.style.display = 'flex';
    contenedor.style.flexDirection = 'column';
    contenedor.style.alignItems = 'center';
    contenedor.style.gap = '15px';
    popup.appendChild(contenedor);

    return contenedor;
}

// Crear sección del total y botón de pago
function crearSeccionTotal(popup) {
    const seccion = document.createElement('div');
    seccion.style.marginTop = '20px';
    seccion.style.paddingTop = '20px';
    seccion.style.borderTop = '2px solid #e1e1e1';

    const totalTexto = document.createElement('h4');
    totalTexto.style.display = 'flex';
    totalTexto.style.justifyContent = 'space-between';
    totalTexto.style.margin = '0 0 15px 0';
    totalTexto.style.fontSize = '1.2em';
    totalTexto.innerHTML = '<span>Total:</span> <span id="total-precio" style="font-weight: bold; color: #d9534f;">0 €</span>';
    seccion.appendChild(totalTexto);

    const botonPagar = document.createElement('button');
    botonPagar.textContent = 'Realizar Pedido';
    botonPagar.style.display = 'block';
    botonPagar.style.width = '100%';
    botonPagar.style.padding = '12px';
    botonPagar.style.marginTop = '10px';
    botonPagar.style.backgroundColor = '#5cb85c';
    botonPagar.style.color = 'white';
    botonPagar.style.border = 'none';
    botonPagar.style.borderRadius = '4px';
    botonPagar.style.fontSize = '1.1em';
    botonPagar.style.cursor = 'pointer';

    botonPagar.addEventListener('click', () => {
        document.getElementById('productos-cesta').innerHTML = '';
        document.getElementById('total-precio').textContent = '0 €';
        localStorage.removeItem('cestaForjaGunter');
        alert('Pedido realizado con éxito. ¡Gracias por su compra!');
        popup.style.right = '-35%';
    });

    seccion.appendChild(botonPagar);
    popup.appendChild(seccion);
}

// Crear un elemento de producto para la cesta
function crearElementoProducto(nombre, precio, imagen, cantidad = 1) {
    const productoDiv = document.createElement('div');
    productoDiv.className = 'producto';
    productoDiv.dataset.nombre = nombre;
    productoDiv.dataset.precio = precio;
    productoDiv.dataset.imagen = imagen;
    productoDiv.style.width = '90%';
    productoDiv.style.padding = '15px';
    productoDiv.style.backgroundColor = 'white';
    productoDiv.style.borderRadius = '5px';
    productoDiv.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    productoDiv.style.display = 'flex';
    productoDiv.style.justifyContent = 'space-between';
    productoDiv.style.alignItems = 'center';
    productoDiv.style.gap = '15px';

    const imgProducto = document.createElement('img');
    imgProducto.src = imagen;
    imgProducto.style.width = '60px';
    imgProducto.style.height = '60px';
    imgProducto.style.objectFit = 'cover';
    imgProducto.style.borderRadius = '3px';

    const infoProducto = document.createElement('div');
    infoProducto.style.flexGrow = '1';
    infoProducto.style.display = 'flex';
    infoProducto.style.flexDirection = 'column';
    infoProducto.style.justifyContent = 'center';
    infoProducto.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 5px;">${nombre}</div>
        <div style="color: #d9534f; font-weight: bold;">${precio} €</div>
    `;

    const controlesCantidad = document.createElement('div');
    controlesCantidad.style.display = 'flex';
    controlesCantidad.style.alignItems = 'center';
    controlesCantidad.style.gap = '8px';

    const botonMenos = document.createElement('button');
    botonMenos.textContent = '-';
    botonMenos.style.padding = '5px 10px';
    botonMenos.style.backgroundColor = '#f0f0f0';
    botonMenos.style.border = '1px solid #ddd';
    botonMenos.style.borderRadius = '3px';
    botonMenos.style.cursor = 'pointer';

    botonMenos.addEventListener('click', () => {
        const input = productoDiv.querySelector('.cantidad-producto');
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
            calcularTotal();
            guardarCesta();
        }
    });

    const inputCantidad = document.createElement('input');
    inputCantidad.type = 'number';
    inputCantidad.className = 'cantidad-producto';
    inputCantidad.value = cantidad;
    inputCantidad.min = '1';
    inputCantidad.style.width = '50px';
    inputCantidad.style.textAlign = 'center';
    inputCantidad.style.padding = '5px';
    inputCantidad.style.border = '1px solid #ddd';
    inputCantidad.style.borderRadius = '3px';

    inputCantidad.addEventListener('change', () => {
        calcularTotal();
        guardarCesta();
    });

    const botonMas = document.createElement('button');
    botonMas.textContent = '+';
    botonMas.style.padding = '5px 10px';
    botonMas.style.backgroundColor = '#f0f0f0';
    botonMas.style.border = '1px solid #ddd';
    botonMas.style.borderRadius = '3px';
    botonMas.style.cursor = 'pointer';

    botonMas.addEventListener('click', () => {
        const input = productoDiv.querySelector('.cantidad-producto');
        input.value = parseInt(input.value) + 1;
        calcularTotal();
        guardarCesta();
    });

    const botonEliminar = document.createElement('button');
    botonEliminar.innerHTML = '&times;';
    botonEliminar.style.padding = '5px 10px';
    botonEliminar.style.backgroundColor = '#f8d7da';
    botonEliminar.style.color = '#721c24';
    botonEliminar.style.border = 'none';
    botonEliminar.style.borderRadius = '3px';
    botonEliminar.style.cursor = 'pointer';

    botonEliminar.addEventListener('click', () => {
        productoDiv.style.animation = 'desaparecer 0.3s forwards';
        setTimeout(() => {
            productoDiv.remove();
            calcularTotal();
            guardarCesta();
        }, 300);
    });

    controlesCantidad.appendChild(botonMenos);
    controlesCantidad.appendChild(inputCantidad);
    controlesCantidad.appendChild(botonMas);

    productoDiv.appendChild(imgProducto);
    productoDiv.appendChild(infoProducto);
    productoDiv.appendChild(controlesCantidad);
    productoDiv.appendChild(botonEliminar);

    return productoDiv;
}

// Calcular el total de la cesta
function calcularTotal() {
    let total = 0;
    const productos = document.querySelectorAll('#productos-cesta .producto');

    productos.forEach(producto => {
        const precio = parseFloat(producto.dataset.precio);
        const cantidad = parseInt(producto.querySelector('.cantidad-producto').value);
        total += precio * cantidad;
    });

    document.getElementById('total-precio').textContent = total.toFixed(2) + ' €';
}

// Guardar la cesta en localStorage
function guardarCesta() {
    const productos = [];
    const elementosProducto = document.querySelectorAll('#productos-cesta .producto');

    elementosProducto.forEach(producto => {
        productos.push({
            nombre: producto.dataset.nombre,
            precio: producto.dataset.precio,
            imagen: producto.dataset.imagen,
            cantidad: producto.querySelector('.cantidad-producto').value
        });
    });

    localStorage.setItem('cestaForjaGunter', JSON.stringify(productos));
}

// Cargar la cesta desde localStorage
function cargarCesta() {
    const cestaGuardada = localStorage.getItem('cestaForjaGunter');
    if (cestaGuardada) {
        const productos = JSON.parse(cestaGuardada);
        const contenedor = document.getElementById('productos-cesta');

        productos.forEach(producto => {
            const elemento = crearElementoProducto(
                producto.nombre,
                producto.precio,
                producto.imagen,
                producto.cantidad
            );
            contenedor.appendChild(elemento);
        });

        calcularTotal();
    }
}

// Añadir un producto a la cesta
function agregarProducto(nombre, precio, imagen) {
    const productosEnCesta = document.querySelectorAll('#productos-cesta .producto');
    let productoExistente = null;

    productosEnCesta.forEach(producto => {
        if (producto.dataset.nombre === nombre) {
            productoExistente = producto;
        }
    });

    if (productoExistente) {
        const input = productoExistente.querySelector('.cantidad-producto');
        input.value = parseInt(input.value) + 1;
    } else {
        const nuevoProducto = crearElementoProducto(nombre, precio, imagen);
        document.getElementById('productos-cesta').appendChild(nuevoProducto);
    }

    calcularTotal();
    guardarCesta();
}

// Crear botón "Añadir al carrito" para un producto
function crearBotonAñadir(producto) {
    const boton = document.createElement('button');
    boton.textContent = 'Añadir al carrito';
    boton.style.padding = '8px 15px';
    boton.style.backgroundColor = '#337ab7';
    boton.style.color = 'white';
    boton.style.border = 'none';
    boton.style.borderRadius = '4px';
    boton.style.marginTop = '10px';
    boton.style.cursor = 'pointer';
    boton.id = 'boton-añadir';

    boton.addEventListener('click', (evento) => {
        evento.preventDefault();
        evento.stopPropagation();

        const nombre = producto.querySelector('p:first-of-type').textContent;
        const precio = producto.querySelector('.precio, .precio1').textContent.replace('€', '').trim();
        const imagen = producto.querySelector('img').src;

        agregarProducto(nombre, precio, imagen);
        document.getElementById('popup-cesta').style.right = '0';
    });

    return boton;
}

// Añadir botones "Añadir al carrito" a todos los productos
function añadirBotonesProductos() {
    const productos = document.querySelectorAll('.producto, .producto1');

    productos.forEach(producto => {
        const boton = crearBotonAñadir(producto);
        const contenedor = producto.querySelector('a') || producto;
        contenedor.appendChild(boton);

        if (contenedor.tagName === 'A') {
            contenedor.addEventListener('click', (evento) => {
                if (evento.target.tagName === 'BUTTON') {
                    evento.preventDefault();
                }
            });
        }
    });
}

// Crear la animación para eliminar productos
function crearAnimacionEliminar() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes desaparecer {
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Configurar eventos del popup
function configurarEventosCesta(popup) {
    document.addEventListener('click', (evento) => {
        const botonCesta = document.querySelector('nav li a[href="#"] img[alt="Imagen Carrito"]');
        if (evento.target !== botonCesta && !popup.contains(evento.target)) {
            popup.style.right = '-35%'; // Ajustado al nuevo tamaño
            guardarCesta();
        }
    });

    const botonCesta = document.querySelector('nav li a[href="#"] img[alt="Imagen Carrito"]');
    if (botonCesta) {
        botonCesta.parentElement.addEventListener('click', (evento) => {
            evento.preventDefault();
            popup.style.right = '0';
        });
    }
}

// Inicializar la cesta
function inicializarCesta() {
    crearAnimacionEliminar();

    const popup = crearPopupCesta();
    const titulo = crearTituloCesta(popup);
    crearBotonCerrar(titulo, popup);
    crearContenedorProductos(popup);
    crearSeccionTotal(popup);

    configurarEventosCesta(popup);
    cargarCesta();
    añadirBotonesProductos();
}

// Iniciar todo
document.addEventListener('DOMContentLoaded', inicializarCesta);