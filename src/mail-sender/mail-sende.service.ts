import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IConfirmationAppoitmentService } from './interfaces/confirmation-appoitment-service.interface';

import { MailConfig } from 'src/common/config/email.config';
import { appointmentConfirmation } from './emails/appoitment-confirmation.email.template';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { LoggerService } from 'src/common/services';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';



@Injectable()
@CatchErrors()
export class MailSenderService extends MailConfig implements IConfirmationAppoitmentService{
  constructor(
    @Inject(LoggerService)
    public readonly loggerService: LoggerService,
    @Inject(ExceptionHandlerService)
    public readonly exceptionHandlerService: ExceptionHandlerService,
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

