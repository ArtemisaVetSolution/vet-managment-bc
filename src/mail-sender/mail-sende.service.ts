import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IConfirmationAppoitmentService } from './interfaces/confirmation-appoitment-service.interface';

import { MailConfig } from 'src/common/config/email.config';
import { appointmentConfirmation } from './emails/appoitment-confirmation.email.template';



@Injectable()
export class MailSenderService extends MailConfig implements IConfirmationAppoitmentService{
  constructor(
    private readonly configService: ConfigService
  ) {
    super();  
  }

  async sendConfirmationEmail(email: string, name: string, appointmentDate: string, appointmentTime: string, collaboratorName: string, petName: string, service: string): Promise<void> {
    const mailOptions = {
      from: 'artemisa.vet.solutions@gmail.com',  
      to: email,  
      subject: 'Confirmación de cita',
      html: appointmentConfirmation(name, appointmentDate, appointmentTime, collaboratorName, petName, service),  
    };

    await this.sendMail(mailOptions);
  }
}

