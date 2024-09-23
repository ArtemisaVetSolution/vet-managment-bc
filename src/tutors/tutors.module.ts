import { Module } from '@nestjs/common';
import { TutorsService } from './tutors.service';
import { TutorsController } from './tutors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutor } from './entities/tutor.entity';
import { HttpModule } from '@nestjs/axios';
import { IHttpAdapter } from 'src/common/interfaces';
import { AxiosHttpAdapter } from 'src/common/http/axios-http-adapter';
import { CommonModule } from 'src/common/common.module';
import { LoggerService } from 'src/common/services';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tutor]), CommonModule],
  controllers: [TutorsController],
  exports: [TutorsService, TypeOrmModule],
  providers: [TutorsService, LoggerService, ExceptionHandlerService],
})
export class TutorsModule {}
