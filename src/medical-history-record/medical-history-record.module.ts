import { Module } from '@nestjs/common';
import { MedicalHistoryRecordService } from './medical-history-record.service';
import { MedicalHistoryRecordController } from './medical-history-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalHistoryRecord } from './entities/medical-history-record.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { PdfGeneratorModule } from 'src/pdf-generator/pdf-generator.module';
import { PdfGeneratorService } from 'src/pdf-generator/pdf-generator.service';
import { CollaboratorsModule } from 'src/collaborators/collaborators.module';
import { CollaboratorsService } from 'src/collaborators/collaborators.service';
import { Collaborator } from 'src/collaborators/entities/collaborator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalHistoryRecord, Patient, Appointment, Collaborator]), PdfGeneratorModule],
  controllers: [MedicalHistoryRecordController],
  providers: [MedicalHistoryRecordService, PdfGeneratorService],
})
export class MedicalHistoryRecordModule {}
