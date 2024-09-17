import { Patient } from "src/patients/entities/patient.entity";
import { IMedicalHistoryRecord } from "../interfaces/medical-history.interface";
import { Collaborator } from "src/collaborators/entities/collaborator.entity";

export const HistoryHtmlTemplate = (patient: Patient, appointmentFindings: IMedicalHistoryRecord) => {
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Historia Clínica</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            width: 792px,
            height: 612px
            margin: 20px;
            }
            h1, h2 {
            text-align: center;
            }
            .section {
            margin-bottom: 20px;
            }
            table {
            width: 100%;
            border-collapse: collapse;
            }
            table, th, td {
            border: 1px solid black;
            padding: 8px;
            }
            th {
            background-color: #f2f2f2;
            }
            td {
            vertical-align: top;
            }
        </style>
        </head>
        <body>

        <h1>Historia Clínica Veterinaria</h1>

        <div class="section">
            <p><strong>Número historia clínica:</strong> 123456789</p>
            <p><strong>ID del paciente:</strong> 123</p>
        </div>

        <div class="section">
            <h2>Datos del Paciente</h2>
            <table>
            <tr>
                <th>Nombre</th>
                <td>${patient.name}</td>
            </tr>
            <tr>
                <th>Raza</th>
                <td>${patient.breed}</td>
            </tr>
            <tr>
                <th>Fecha de Nacimiento</th>
                <td>${patient.dob}</td>
            </tr>
            <tr>
                <th>Sexo</th>
                <td>${patient.gender}</td>
            </tr>
            <tr>
                <th>Especie</th>
                <td>${patient.specie}</td>
            </tr>
            <tr>
                <th>Color</th>
                <td>${patient.color}</td>
            </tr>
            <tr>
                <th>Peso</th>
                <td>${patient.weight}</td>
            </tr>
            </table>
        </div>

        <div class="section">
            <h2>Anamnesis</h2>
            <table>
            <tr>
                <th>Alimentación</th>
                <td>${patient.alimentation}</td>
            </tr>
            <tr>
                <th>Enfermedades Previas</th>
                <td>${appointmentFindings.previousIllnesses}</td>
            </tr>
            <tr>
                <th>Esterilización</th>
                <td>${patient.sterilized}</td>
            </tr>
            </table>
        </div>

        <div class="section">
            <h2>Motivo de Consulta</h2>
            <p> ${appointmentFindings.consultationReason}</p>
        </div>

        <div class="section">
            <h2>Examen Clínico</h2>
            <table>
            <tr>
                <th>FR</th>
                <td>${appointmentFindings.respiratoryRate} rpm</td>
            </tr>
            <tr>
                <th>FC</th>
                <td>${appointmentFindings.heartRate} lpm</td>
            </tr>
            <tr>
                <th>T°</th>
                <td>${appointmentFindings.temperature}°C</td>
            </tr>
            <tr>
                <th>Pulso</th>
                <td>${appointmentFindings.pulse}</td>
            </tr>
            <tr>
                <th>TLLC</th>
                <td>${appointmentFindings.CRT} seg</td>
            </tr>
            <tr>
                <th>Ganglios</th>
                <td>${appointmentFindings.limphaticNodes}</td>
            </tr>
            <tr>
                <th>Mucosas</th>
                <td>${appointmentFindings.mucosa}</td>
            </tr>
            <tr>
                <th>Temperamento</th>
                <td>${appointmentFindings.temperament}</td>
            </tr>
            </table>
        </div>

        <div class="section">
            <h2>Hallazgos</h2>
            <p> ${appointmentFindings.findings}</p>
        </div>

        <div class="section">
            <h2>Exámenes Complementarios Enviados</h2>
            <p> ${appointmentFindings.tests}</p>
        </div>

        </body>
</html>

    `
}