import { StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces"
import { MedicalHistoryRecord } from "../entities/medical-history-record.entity"
import { Patient } from "src/patients/entities/patient.entity"
import { Collaborator } from "src/collaborators/entities/collaborator.entity"

export const pdfRecordContent = (medicalHistoryRecord: MedicalHistoryRecord, patient: Patient, collaborator: Collaborator): TDocumentDefinitions => {


    const styles: StyleDictionary = {
        h1: {
            fontSize: 20,
            margin: [10, 10],
            bold: true,
            alignment: 'center'
        },
    }
    return {
        pageSize: 'LETTER',
        defaultStyle: {
            lineHeight: 1.3
        },
        header: {
            columns: [
                {
                    text: medicalHistoryRecord.appointment.date.toISOString().split('T')[0] || 'no date',
                    alignment: 'left',
                    margin: [15, 15],
                    fontSize: 11,
                    italics: true,
                    
                },
                {
                    text: 'Artemisa Vet Solutions',
                    alignment: 'right',
                    margin: [15, 15],
                    fontSize: 11,
                    italics: true
                },

            ]

        },
        content: [
            {
                text: 'Historia Clínica',
                style: 'h1',
                alignment: 'center'
            },

            {
                margin: [15, 15],
                layout: 'lightHorizontalLines',
                table: {
                    headerRows: 0,
                    widths: ['*', '*', '*'],
                    body: [
                        [
                            {
                                colSpan: 3,
                                text: `Historia N°${medicalHistoryRecord.id} `,
                                italics: true,
                                alignment: 'right',
                                margin: [10, 10]
                            }, {}, {}
                        ],
                        [
                            {
                                text: 'Datos del paciente',
                                bold: true,
                                alignment: 'center',
                                colSpan: 3,
                                margin: [8, 8],
                            }, {}, {}
                        ],
                        [
                            {
                                text: [{ text: 'Nombre: ', bold: true }, patient.name]
                            },
                            {
                                text: [{ text: 'Especie: ', bold: true }, patient.specie]
                            },
                            {
                                text: [{ text: 'Raza: ', bold: true }, patient.breed]
                            }
                        ],
                        [
                            {
                                text: [{ text: 'Color: ', bold: true }, patient.color]
                            },
                            {
                                text: [{ text: 'Sexo: ', bold: true }, patient.gender]
                            },
                            {
                                text: [{ text: 'Fecha de nacimiento: ', bold: true }, patient.dob.toISOString().split('T')[0]]
                            }
                        ],
                        [
                            {
                                text: [{ text: 'Peso: ', bold: true }, patient.weight]
                            },
                            {
                                text: [{ text: 'Esterilizado: ', bold: true }, patient.sterilized ? 'Si' : 'No']
                            }, {}

                        ],
                        [
                            {
                                text: 'Anamnesis',
                                bold: true,
                                alignment: 'center',
                                colSpan: 3,
                                margin: [8, 8],  
                            }, {}, {}
                        ],
                        [
                            {
                                text: 'Alimentación: ',
                                bold: true
                            },
                            {
                                colSpan: 2,
                                text: patient.alimentation
                            }, {}
                        ],
                        [
                            {
                                text: `Enfermedades previas:`,
                                bold: true
                            },
                            {
                                colSpan: 2,
                                text: medicalHistoryRecord.content.previousIllnesses
                            }, {}
                        ],
                        [
                            {

                                text: `Motivo de consulta: `,
                                bold: true
                            },
                            {
                                colSpan: 2,
                                text: medicalHistoryRecord.content.consultationReason
                            }, {}
                        ],
                        [
                            {
                                text: 'Examen clínico',
                                bold: true,
                                alignment: 'center',
                                colSpan: 3,
                                margin: [8, 8]
                            }, {}, {}
                        ],
                        [
                            {
                                text: [{ text: 'FC: ', bold: true }, medicalHistoryRecord.content.heartRate, ' lpm']
                            },
                            {
                                text: [{ text: 'FR: ', bold: true }, medicalHistoryRecord.content.respiratoryRate, ' rpm']
                            },
                            {
                                text: [{ text: 'Pulso: ', bold: true }, medicalHistoryRecord.content.pulse]
                            },
                        ],
                        [
                            {
                                text: [{ text: 'TLLC: ', bold: true }, medicalHistoryRecord.content.CRT, ' sg']
                            },
                            {
                                text: [{ text: 'Temperatura: ', bold: true }, medicalHistoryRecord.content.temperature, '°C']
                            },
                            {
                                text: [{ text: 'Temperamento: ', bold: true }, medicalHistoryRecord.content.temperament]
                            },
                        ],
                        [
                            {
                                text: [{ text: 'Mucosas: ', bold: true }, medicalHistoryRecord.content.mucosa]
                            },
                            {
                                colSpan: 2,
                                text: [{ text: 'Linfonodos: ', bold: true }, medicalHistoryRecord.content.limphaticNodes]
                            }, {}
                        ],
                        [
                            {
                                text: 'Hallazgos clínicos',
                                bold: true,
                                alignment: 'center',
                                colSpan: 3,
                                margin: [8, 8]
                            }, {}, {}
                        ],
                        [
                            {
                                colSpan: 3,
                                text: medicalHistoryRecord.content.findings
                            }, {}, {}
                        ],
                        [
                            {
                                text: 'Exámenes complementarios',
                                bold: true,
                                alignment: 'center',
                                colSpan: 3,
                                margin: [8, 8]
                            }, {}, {}
                        ],
                        [
                            {
                                colSpan: 3,
                                text: medicalHistoryRecord.content.tests
                            }, {}, {}
                        ],
                    ],
                },
            },
            {
                alignment: 'right',

                text: [{
                    text: 'Responsable: ',
                    bold: true,
                    
                }, {
                    text: collaborator.name,
                    italics: true,
                    decoration: 'underline',
                    lineHeight: 2,
                   
                }],
            },
        ],
        styles: styles,
    }

}