import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { Tutor } from 'src/tutors/entities/tutor.entity';
import { PatientQueryDto } from './dto/patient-query.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient) private patientsRepository: Repository<Patient>,
    @InjectRepository(Tutor) private tutorsRepository: Repository<Tutor>
  ) { }

  @CatchErrors()
  async create(createPatientDto: CreatePatientDto) {

    const tutor: Tutor = await this.tutorsRepository.findOne({ where: { id: createPatientDto.tutorId } });

    if (!tutor) throw new NotFoundException('Tutor was not found');

    const newPatient: Patient = this.patientsRepository.create({ ...createPatientDto, tutor });

    return await this.patientsRepository.save(newPatient);

  }

  @CatchErrors()
  async findWithQueryParams(patientQuery: PatientQueryDto) {

    const query = this.patientsRepository.createQueryBuilder('patient')

    if (patientQuery.tutorId) {
      const tutor = await this.tutorsRepository.findOne({ where: { id: patientQuery.tutorId } });
      if (!tutor) throw new NotFoundException('Tutor was not found');
      query.andWhere(`patient.tutor = :tutor`, { tutor: tutor.id });
    }

    if (patientQuery.specie) {
      query.andWhere('patient.specie = :specie', { specie: patientQuery.specie });
    }

    const patients: Patient[] = await query.getMany();

    if (!patients.length) throw new NotFoundException('No patients were found');

    return patients;
  }

  @CatchErrors()
  async findOne(id: number) {
    const patient: Patient = await this.patientsRepository.findOne({ where: { id } });

    if (!patient) throw new NotFoundException('Patient was not found');

    return patient;
  }

  @CatchErrors()
  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const result = await this.patientsRepository.update(id, updatePatientDto);

    if (result.affected === 0) {
      throw new NotFoundException('Patient not found');
    }

    return await this.patientsRepository.findOne({ where: { id } });
  }

  @CatchErrors()
  async remove(id: number) {

    const patient: Patient = await this.findOne(id);
    await this.patientsRepository.softDelete(id);

    return patient;
  }
}
