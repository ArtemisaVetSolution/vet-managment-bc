import { Module } from '@nestjs/common';
import { PdfGeneratorService } from './pdf-generator.service';
import { LoggerService } from 'src/common/services';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';

@Module({
  providers: [PdfGeneratorService, LoggerService, ExceptionHandlerService],
  exports: [PdfGeneratorService]
})
export class PdfGeneratorModule {}
