module.exports.bodyUserAlert = (info) =>
  `<!doctypehtml><html lang=es><meta charset=UTF-8><meta content="width=device-width,initial-scale=1"name=viewport><title>Nuevo Interés de Compra</title><style>body{font-family:Arial,sans-serif;background-color:#f4f4f4;margin:0;padding:20px}.container{max-width:600px;margin:0 auto;background-color:#fff;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,.1);padding:20px}h1{color:#333}p{color:#666}.highlight{color:#4285f4;font-weight:700}.footer{margin-top:20px;text-align:center;color:#999}</style><div class=container><h1>¡Nuevo Interés de de tu libro!</h1><p>¡Hola <span class=highlight>${info.bookOwner}</span>!<p>Esperamos que te encuentres bien. Queríamos informarte que el usuario ${info.info.userInterested} ha mostrado interés en ${info.transactionType} tu libro "<span class=highlight>${info.bookName}</span>".<h2>Detalles del Interés:</h2><ul><li><strong>Nombre del Usuario:</strong> <span class=highlight>${info.info.userInterested}</span><li><strong>Correo Electrónico del Usuario:</strong> <span class=highlight>${info.emailInterestedUser}</span><li><strong>Título del Libro:</strong> "<span class=highlight>${info.bookInterested}</span>"</ul><p>Si estás interesado en responder a esta solicitud de compra, puedes ponerte en contacto con el usuario a través de su correo electrónico proporcionado.<p>¡Gracias por formar parte de nuestra comunidad de libros!<div class=footer><p>Atentamente,<br>Libros Libres PY</div></div>`;

module.exports.subjectUserAlert = () => "¡Nuevo Interés de de tu libro!";

module.exports.bodyEmailVerification = (info) => `
<div><p>Gracias por registrarte!<br><p style=margin-bottom:2%>Tu cuenta ha sido creada, puedes iniciar sesión con lo siguiente credenciales después de haber activado su cuenta presionando la url abajo.<hr>Username: ${info.email}<br>Password: ********* <br><hr><p>Haga clic en este enlace para activar su cuenta:</p><a href=${info.spanishLinkVerification}>Verificar Correo</a></div>`;

module.exports.subjectEmailVerification = ()=> 'Verificación de correo electrónico';
/**
 * bookName
 * bookOwner
 * bookInterested
 * transactionType
 * emailInterestedUser
 */
