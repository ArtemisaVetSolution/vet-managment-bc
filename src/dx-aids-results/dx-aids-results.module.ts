import { Module } from '@nestjs/common';
import { DxAidsResultsService } from './dx-aids-results.service';
import { DxAidsResultsController } from './dx-aids-results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DxAidsResult } from './entities/dx-aids-result.entity';
import { PatientsModule } from 'src/patients/patients.module';
import { ServicesModule } from 'src/services/services.module';
import { PatientsService } from 'src/patients/patients.service';
import { ServicesService } from 'src/services/services.service';
import { Patient } from 'src/patients/entities/patient.entity';
import { Tutor } from 'src/tutors/entities/tutor.entity';
import { Service } from 'src/services/entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DxAidsResult, Patient, Tutor, Service]), PatientsModule, ServicesModule],
  controllers: [DxAidsResultsController],
  providers: [DxAidsResultsService, PatientsService, ServicesService],
})
export class DxAidsResultsModule {}
