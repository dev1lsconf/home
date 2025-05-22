document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const navMobile = document.querySelector(".nav-mobile");
    const navLinks = document.querySelectorAll(".nav-mobile .nav-link"); // Links dentro del menú móvil

    // Toggle del menú móvil al hacer clic en el botón
    navToggle.addEventListener("click", () => {
        navMobile.classList.toggle("active");
        navToggle.classList.toggle("active"); // Para animar el icono de hamburguesa
        // Opcional: Bloquear scroll del body cuando el menú está abierto
        // document.body.classList.toggle('no-scroll');
    });

    // Cerrar el menú móvil al hacer clic en un enlace (para navegación fluida)
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMobile.classList.remove("active");
            navToggle.classList.remove("active");
            // document.body.classList.remove('no-scroll');
        });
    });
    // --- NUEVO Código para el manejo del formulario de contacto con Fetch ---
    const contactForm = document.getElementById("contact-form"); // Selecciona el formulario por ID
    const statusMessageDiv = document.getElementById("form-status-message"); // Selecciona el div de mensajes

    if (contactForm && statusMessageDiv) { // Asegúrate de que ambos elementos existen
        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault(); // !!! Previene el envío tradicional del formulario !!!

            // 1. Mostrar mensaje de "Enviando..."
            statusMessageDiv.textContent = "Enviando mensaje...";
            statusMessageDiv.className = "form-status-message"; // Limpia clases anteriores
            statusMessageDiv.style.display = "block"; // Hace visible el mensaje

            // 2. Recoger datos del formulario
            const formData = new FormData(contactForm);
            // FormData no es directamente JSON, convertir a objeto y luego a JSON string
            const formDataObject = {};
            formData.forEach((value, key) => {
                formDataObject[key] = value;
            });
            const formDataJsonString = JSON.stringify(formDataObject);

            // 3. Enviar datos a la Serverless Function usando Fetch API
            try {
                const response = await fetch("/api/contact", { // <--- URL de tu Serverless Function
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // Indicar que enviamos JSON
                    },
                    body: formDataJsonString, // El cuerpo de la solicitud es el JSON string
                });

                const responseData = await response.json(); // Leer la respuesta del servidor (esperamos JSON)

                // 4. Manejar la respuesta
                if (response.ok) { // response.ok es true para códigos de estado 2xx
                    statusMessageDiv.textContent = responseData.message ||
                        "¡Mensaje enviado con éxito!";
                    statusMessageDiv.className = "form-status-message success"; // Aplica clase para estilo de éxito
                    contactForm.reset(); // Limpia los campos del formulario
                } else { // Si la respuesta no es 2xx (incluye 4xx y 5xx)
                    statusMessageDiv.textContent = responseData.error ||
                        "Hubo un error al enviar el mensaje.";
                    statusMessageDiv.className = "form-status-message error"; // Aplica clase para estilo de error
                }
            } catch (error) {
                // 5. Manejar errores de red o cualquier otra excepción durante el fetch
                console.error("Error al enviar el formulario:", error);
                statusMessageDiv.textContent =
                    "Hubo un problema de conexión. Por favor, inténtalo de nuevo.";
                statusMessageDiv.className = "form-status-message error";
            }

            // Opcional: Ocultar el mensaje de estado después de un tiempo
            // setTimeout(() => {
            //     statusMessageDiv.style.display = 'none';
            // }, 5000); // Oculta después de 5 segundos
        });
    }
    // --- Fin Código para el manejo del formulario ---

    // --- Script para actualizar el año en el footer (ya estaba) ---
    const currentYearSpan = document.getElementById("current-year");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    // Opcional: Smooth scroll para enlaces internos (requiere ajuste si usas overflow)
    // const internalLinks = document.querySelectorAll('a[href^="#"]');
    // internalLinks.forEach(link => {
    //     link.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         document.querySelector(this.getAttribute('href')).scrollIntoView({
    //             behavior: 'smooth'
    //         });
    //     });
    // });
});

