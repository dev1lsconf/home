// Importa la librería de Resend.
// ¡Asegúrate de haberla instalado con npm o yarn! (Ver Paso 5)
const { Resend } = require("resend");

// Obtén la API Key de las variables de entorno de Vercel.
// ¡NUNCA escribas la API Key directamente aquí!
// El nombre de la variable (VERCEL_RESEND_API_KEY) se configurará en Vercel (Ver Paso 7)
const resend = new Resend(process.env.VERCEL_RESEND_API_KEY);

// --- Configuración ---
// ¡CAMBIA ESTAS DOS DIRECCIONES DE CORREO!
const YOUR_EMAIL_ADDRESS = "ericbatista@gmail.com"; // El email donde recibirás los mensajes
// const FROM_EMAIL_ADDRESS = 'contact@tudominio.com'; // Un email verificado en Resend (ej: contact@tu-dominio-verificado.com)

// Esta es la función principal que Vercel ejecutará cuando se acceda a /api/contact
module.exports = async (req, res) => {
  // 1. Verificar el método HTTP
  if (req.method !== "POST") {
    // Si no es POST, devuelve un error 405 (Método no permitido)
    return res.status(405).json({
      error: "Método no permitido. Solo se aceptan solicitudes POST.",
    });
  }

  // 2. Verificar que el cuerpo de la solicitud no esté vacío y sea JSON
  // Vercel parsea automáticamente el JSON en req.body
  if (!req.body) {
    return res.status(400).json({ error: "Cuerpo de solicitud vacío." });
  }

  // 3. Extraer datos del cuerpo de la solicitud (asumiendo que es JSON)
  const { name, email, message } = req.body;

  // 4. Validación Básica de los datos
  if (!name || !email || !message) {
    return res.status(400).json({
      error:
        "Por favor, completa todos los campos requeridos: Nombre, Email y Mensaje.",
    });
  }

  // Validación básica del formato de email usando una expresión regular simple
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Por favor, introduce una dirección de email válida.",
    });
  }

  // 5. Intentar enviar el correo usando Resend
  try {
    const { data, error } = await resend.emails.send({
      from: `Portafolio <${FROM_EMAIL_ADDRESS}>`, // Remitente: Nombre + email verificado en Resend
      to: [YOUR_EMAIL_ADDRESS], // Destinatario(s): Tu email donde quieres recibir
      subject: `Mensaje del Portafolio de ${name}`, // Asunto del correo
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`, // Contenido del correo en texto plano
      // html: `<h1>Nuevo Mensaje</h1>...`, // Opcional: Contenido en HTML
      reply_to: email, // Configura la respuesta automática para responder al email del remitente del formulario
    });

    // 6. Manejar la respuesta de Resend
    if (error) {
      // Si Resend devuelve un error
      console.error("Error al enviar correo con Resend:", error); // Log en los logs de Vercel
      return res.status(500).json({
        error:
          "Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.",
      });
    }

    // 7. Si el envío fue exitoso
    return res.status(200).json({
      message: "¡Mensaje enviado con éxito! Gracias por contactarme.",
    });
  } catch (error) {
    // 8. Manejar cualquier otro error inesperado durante el proceso
    console.error("Error general en la función serverless:", error); // Log en los logs de Vercel
    return res.status(500).json({
      error: "Hubo un error interno del servidor.",
    });
  }
};

