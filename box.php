<?php

// --- Incluir el Autoloader de Composer ---
// Esto carga la librería de Resend y otras dependencias
require __DIR__ . '/vendor/autoload.php';

use Resend\Resend;
use Resend\Exceptions\ResendException;

// --- Configuración ---
$recipient_email = "ericbatista@gmail.com"; // <-- ¡CAMBIA ESTO por tu dirección de correo!
// $from_email_address = ""; // <-- ¡CAMBIA ESTO por un email VERIFICADO en Resend! (ej: contact@tudominio.com)
$subject_prefix = "Mensaje de clientes desde el Portafolio: "; // Prefijo para el asunto del email
$redirect_on_success = "index.html?status=success"; // URL para redirigir después de éxito
$redirect_on_error = "index.html?status=error";     // URL para redirigir después de error


// --- Obtener API Key de Resend de forma segura ---
$resend_api_key = getenv('re_jQxbbwoM_KggyxGLXuUCvvagw7x6far7Y'); // Lee la variable de entorno
// Fallback si la variable de entorno no está configurada (menos seguro, solo para desarrollo/prueba si es necesario)
if (!$resend_api_key) {
    // ¡ADVERTENCIA: No es seguro almacenar la clave aquí en producción!
    // $resend_api_key = 're_YOUR_HARDCODED_API_KEY'; // <-- SOLO para pruebas, ELIMINAR EN PRODUCCIÓN
    // Si no está en entorno y no la hardcodeas, habrá un error.
    error_log("RESEND_API_KEY variable de entorno no configurada.");
    // Podrías redirigir a un error aquí
     header("Location: " . $redirect_on_error . "_config");
     exit;
}


// --- Inicializar cliente de Resend ---
$resend = new Resend($resend_api_key);


// --- Procesamiento del Formulario ---

// Verifica si la solicitud es POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Recoge y sanitiza los datos del formulario
    // Usar FILTER_SANITIZE_SPECIAL_CHARS es más seguro que htmlspecialchars directamente
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS);

    // --- Validación Básica ---
    $errors = [];

    if (empty($name)) {
        $errors[] = "El campo Nombre es obligatorio.";
    }
    if (empty($email)) {
        $errors[] = "El campo Email es obligatorio.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "La dirección de Email no es válida.";
    }
    if (empty($message)) {
        $errors[] = "El campo Mensaje es obligatorio.";
    }

    // Si no hay errores de validación...
    if (empty($errors)) {

        try {
            // --- Enviar el correo usando Resend ---
            $result = $resend->emails->send([
                'from' => 'Portafolio <' . $from_email_address . '>', // Nombre que aparecerá y email remitente verificado
                'to' => [$recipient_email], // A quién se envía el correo (puede ser un array de emails)
                'subject' => $subject_prefix . "Nuevo mensaje de " . $name, // Asunto del correo
                'text' => "Nombre: " . $name . "\nEmail: " . $email . "\n\nMensaje:\n" . $message, // Cuerpo del correo en texto plano
                // 'html' => '...', // Opcional: cuerpo del correo en HTML
                'reply_to' => $email // Para poder responder directamente al email del remitente
            ]);

            // Si no hay excepción, generalmente fue exitoso (Resend SDK lanza excepciones en errores API)
            // Puedes opcionalmente verificar $result si necesitas el ID del email enviado
            // $email_id = $result->id;

            // Envío exitoso
            header("Location: " . $redirect_on_success);
            exit; // Importante para detener la ejecución del script

        } catch (ResendException $e) {
            // Error específico de la API de Resend
            error_log("Error al enviar correo con Resend API: " . $e->getMessage());
            header("Location: " . $redirect_on_error . "_resend_api");
            exit;
        } catch (\Exception $e) {
             // Otros errores inesperados
             error_log("Error inesperado al enviar correo: " . $e->getMessage());
             header("Location: " . $redirect_on_error . "_general");
             exit;
        }


    } else {
        // Si hay errores de validación
         header("Location: " . $redirect_on_error . "_validation");
         exit;
    }

} else {
    // Si no es una solicitud POST (alguien intenta acceder directamente al script)
    header("Location: index.html");
    exit;
}

?>
