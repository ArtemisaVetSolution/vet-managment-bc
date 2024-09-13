import { Module } from '@nestjs/common';
import { TestsResultsService } from './tests-results.service';
import { TestsResultsController } from './tests-results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from 'src/patients/patients.module';
import { ServicesModule } from 'src/services/services.module';
import { PatientsService } from 'src/patients/patients.service';
import { ServicesService } from 'src/services/services.service';
import { Patient } from 'src/patients/entities/patient.entity';
import { Tutor } from 'src/tutors/entities/tutor.entity';
import { Service } from 'src/services/entities/service.entity';
import { TestResult } from './entities/test-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestResult, Patient, Tutor, Service]), PatientsModule, ServicesModule],
  controllers: [TestsResultsController],
  providers: [TestsResultsService, PatientsService, ServicesService],
})
export class TestsResultsModule {}
