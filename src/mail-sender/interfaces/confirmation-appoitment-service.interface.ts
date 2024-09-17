export interface IConfirmationAppoitmentService {
    sendConfirmationEmail(email: string, name: string,  appointmentDate: string, appointmentTime: string, collaboratorName: string, petName: string, service: string): Promise<void>;
}