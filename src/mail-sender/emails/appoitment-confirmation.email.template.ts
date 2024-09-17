export const appointmentConfirmation = (name: string, appointmentDate: string, appointmentTime: string, collaboratorName: string, petName: string, service: string) => {
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmación de cita</title>
        </head>
        <body style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 40px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; box-shadow: 0px 3px 12px rgb(47 43 61 / 0.14);">
            <div style="text-align: center; margin-bottom: 20px;">
            <img src="URL_DEL_LOGO" alt="Logo de la Compañía" style="width: 100px; height: auto;">
            </div>
            <h2 style="color: #181e4b; text-align: center;">Confirmación de Cita</h2>
            <p style="color: #333;">Hola <span style="color: #181e4b; font-weight: bold;">${name}</span>,</p>
            <p style="color: #333;">La cita para ${petName} esta confirmada con los siguientes detalles:</p>
            <ul style="color: #333;">
                <li><strong>Fecha:</strong> ${appointmentDate}</li>
                <li><strong>Hora:</strong> ${appointmentTime}</li>
                <li><strong>Nombre del colaborador:</strong> ${collaboratorName}</li>
                <li><strong>Servicio:</strong> ${service}</li>
            </ul>
            <p style="color: #333;">Si no solicitaste esta cita, por favor ignora este correo.</p>
        </div>
        </body>
        </html>
    `;
}