import { Module } from '@nestjs/common';
import { MailSenderService } from './mail-sende.service';
import { LoggerService } from 'src/common/services';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';



@Module({
  controllers: [],
  providers: [{
    provide: 'IConfirmationAppoitmentService',
    useClass: MailSenderService
  },
  LoggerService, ExceptionHandlerService],
  exports: ['IConfirmationAppoitmentService']
})
export class MailsenderserviceModule {}
