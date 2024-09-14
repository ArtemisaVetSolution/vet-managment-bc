import { Catch, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicalHistoryRecordDto } from './dto/create-medical-history-record.dto';
import { UpdateMedicalHistoryRecordDto } from './dto/update-medical-history-record.dto';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalHistoryRecord } from './entities/medical-history-record.entity';
import { Repository } from 'typeorm';
import { Patient } from 'src/patients/entities/patient.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { pdfRecordContent } from './docs/pdf-content';
import { PdfGeneratorService } from 'src/pdf-generator/pdf-generator.service';
import { Collaborator } from 'src/collaborators/entities/collaborator.entity';

@Injectable()
export class MedicalHistoryRecordService {
  constructor(
    @InjectRepository(MedicalHistoryRecord) private medicalHistoryRepository: Repository<MedicalHistoryRecord>,
    @InjectRepository(Patient) private patientsRepository: Repository<Patient>,
    @InjectRepository(Appointment) private appointmentsRepository: Repository<Appointment>,
    @InjectRepository(Collaborator) private collaboratorsRepository: Repository<Collaborator>,
    private readonly pdfGeneratorService: PdfGeneratorService
  ) { }

  @CatchErrors()
  async create(createMedicalHistoryRecordDto: CreateMedicalHistoryRecordDto) {
    const patient = await this.patientsRepository.findOne({ where: { id: createMedicalHistoryRecordDto.patientId } });
    const appointment = await this.appointmentsRepository.findOne({ where: { id: createMedicalHistoryRecordDto.appointmentId } });

    if (!patient || !appointment) throw new NotFoundException('Patient or appointment not found');

    patient.alimentation = createMedicalHistoryRecordDto.patientState.alimentation;
    patient.weight = createMedicalHistoryRecordDto.patientState.weight;
    patient.sterilized = createMedicalHistoryRecordDto.patientState.sterilized;

    await this.patientsRepository.save(patient);

    const newRecord = this.medicalHistoryRepository.create({
      content: createMedicalHistoryRecordDto.content,
      patientState: createMedicalHistoryRecordDto.patientState,
      patient,
      appointment
    })

    return await this.medicalHistoryRepository.save(newRecord);
  }

  @CatchErrors()
  async generatePdf(id: string) {
    const medicalRecord = await this.findOne(id, ['patient', 'appointment.collaborator'])
    const patient = await this.patientsRepository.findOne({ where: { id: medicalRecord.patient.id } });
    const collaborator = await this.collaboratorsRepository.findOne({ where: { id: medicalRecord.appointment.collaborator.id } });
    if (!patient || !collaborator) throw new NotFoundException('Patient or collaborator not found');
    const docDefinition = pdfRecordContent(medicalRecord, patient, collaborator);
    return this.pdfGeneratorService.generatePdf(docDefinition);
  }

  findAll() {
    return `This action returns all medicalHistoryRecord`;
  }

  @CatchErrors()
  async findOne(id: string, relations?: string[]) {
    const medicalRecord = await this.medicalHistoryRepository.findOne({ where: { id }, relations });
    if(!medicalRecord) throw new NotFoundException('Medical record not found');
    return medicalRecord;
  }

  update(id: number, updateMedicalHistoryRecordDto: UpdateMedicalHistoryRecordDto) {
    return `This action updates a #${id} medicalHistoryRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicalHistoryRecord`;
  }
}
