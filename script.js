// =====================================================================
//  Vantelix Tecnologías - Práctica 3: Interactividad con JavaScript
// =====================================================================

// Esperar a que todo el HTML esté cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {

    // Mensaje en consola para confirmar que el script se cargó
    console.log("Sistema Vantelix cargado correctamente");

    // -----------------------------------------------------------------
    // 1. Mensaje de bienvenida al cargar el sitio
    // -----------------------------------------------------------------
    alert("¡Bienvenido a Vantelix Tecnologías!");

    // -----------------------------------------------------------------
    // 2. Reloj dinámico en formato de 12 horas
    // -----------------------------------------------------------------
    const reloj = document.getElementById("reloj");

    function actualizarReloj() {
        const ahora = new Date();                 // Fecha y hora actual
        let horas = ahora.getHours();             // 0 a 23
        const minutos = ahora.getMinutes();
        const segundos = ahora.getSeconds();

        const periodo = horas >= 12 ? "PM" : "AM"; // Saber si es AM o PM
        horas = horas % 12;                        // Pasar a formato de 12 horas
        if (horas === 0) {
            horas = 12;                            // Las 0 horas se muestran como 12
        }

        // padStart agrega un 0 al inicio si el número tiene un solo dígito
        const h = String(horas).padStart(2, "0");
        const m = String(minutos).padStart(2, "0");
        const s = String(segundos).padStart(2, "0");

        reloj.textContent = h + ":" + m + ":" + s + " " + periodo;
    }

    actualizarReloj();                 // Mostrar la hora de inmediato
    setInterval(actualizarReloj, 1000); // Actualizar cada segundo (1000 ms)

    // -----------------------------------------------------------------
    // 3. Detectar cuando el usuario selecciona un servicio
    // -----------------------------------------------------------------
    const selectServicio = document.getElementById("servicio");

    selectServicio.addEventListener("change", function () {
        console.log("Servicio seleccionado: " + selectServicio.value);
    });

    // -----------------------------------------------------------------
    // 4. Eventos del mouse sobre los botones
    // -----------------------------------------------------------------
    const botones = document.querySelectorAll(".boton");

    botones.forEach(function (boton) {
        // Cuando el mouse entra al botón
        boton.addEventListener("mouseover", function () {
            console.log("mouseover: el usuario está sobre el botón \"" + boton.textContent + "\"");
        });

        // Cuando el mouse sale del botón
        boton.addEventListener("mouseleave", function () {
            console.log("mouseleave: el usuario salió del botón \"" + boton.textContent + "\"");
        });
    });

    // -----------------------------------------------------------------
    // 5, 6 y 7. Validar, confirmar y guardar el formulario
    // -----------------------------------------------------------------
    const formulario = document.getElementById("formContacto");
    const confirmacion = document.getElementById("confirmacion");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que la página se recargue al enviar

        // Obtener los valores de cada campo (trim quita los espacios)
        const nombre = document.getElementById("Nombre").value.trim();
        const correo = document.getElementById("Correo").value.trim();
        const telefono = document.getElementById("Telefono").value.trim();
        const servicio = document.getElementById("servicio").value;
        const mensaje = document.getElementById("Mensaje").value.trim();

        // 5. Validar que ningún campo esté vacío
        if (nombre === "" || correo === "" || telefono === "" || servicio === "" || mensaje === "") {
            alert("Por favor, completa todos los campos antes de enviar.");
            return; // Detiene la función, no se guarda nada
        }

        // 7. Guardar la información en localStorage
        const datos = {
            nombre: nombre,
            correo: correo,
            telefono: telefono,
            servicio: servicio,
            mensaje: mensaje,
            fecha: new Date().toLocaleString()
        };

        // JSON.stringify convierte el objeto en texto para poder guardarlo
        localStorage.setItem("solicitudVantelix", JSON.stringify(datos));
        console.log("Datos guardados en localStorage:", datos);

        // 6. Mensaje de confirmación
        alert("¡Gracias, " + nombre + "! Tu solicitud fue enviada con éxito.");
        confirmacion.textContent = "Solicitud registrada: un asesor te contactará pronto sobre " + servicio + ".";
        confirmacion.style.display = "block";

        formulario.reset(); // Limpiar el formulario

        // Ocultar el mensaje después de 5 segundos
        setTimeout(function () {
            confirmacion.style.display = "none";
        }, 5000);
    });

});
