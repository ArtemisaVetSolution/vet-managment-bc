import { Module } from '@nestjs/common';
import { MailSenderService } from './mail-sende.service';



@Module({
  controllers: [],
  providers: [{
    provide: 'IConfirmationAppoitmentService',
    useClass: MailSenderService
  }],
  exports: ['IConfirmationAppoitmentService']
})
export class MailsenderserviceModule {}
