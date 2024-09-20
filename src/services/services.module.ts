import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { CommonModule } from 'src/common/common.module';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';
import { LoggerService } from 'src/common/services';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, LoggerService, ExceptionHandlerService],
  exports: [ServicesService],
  imports: [TypeOrmModule.forFeature([Service]), CommonModule, ],
})
export class ServicesModule {}
