import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { Tutor } from 'src/tutors/entities/tutor.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient) private patientsRepository: Repository <Patient>,
    @InjectRepository(Tutor) private tutorsRepository: Repository <Tutor>
  ) {}

  @CatchErrors()
  async create(createPatientDto: CreatePatientDto) {

    const tutor: Tutor = await this.tutorsRepository.findOne({ where: { id: createPatientDto.tutorId }});

    if (!tutor) throw new NotFoundException('Tutor was not found');

    const newPatient: Patient = this.patientsRepository.create({...createPatientDto, tutor});

    return await this.patientsRepository.save(newPatient);

  }

  @CatchErrors()
  async findAll() {
    const patients : Patient[] = await this.patientsRepository.find();

    if (!patients.length) throw new NotFoundException('No patients were found');

    return patients;
  }

  @CatchErrors()
  async findOne(id: number) {
    const patient: Patient = await this.patientsRepository.findOne({ where: { id }});

    if(!patient) throw new NotFoundException('Patient was not found');

    return patient;
  }

  @CatchErrors()
  async findByTutorId( id: number ) {

    const tutor: Tutor = await this.tutorsRepository.findOne({ where: {id}});

    if(!tutor) throw new NotFoundException('Tutor not found');

    const patients: Patient[] = await this.patientsRepository.findBy({ tutor })

    if(!patients) throw new NotFoundException('No patients were found for that tutor');

    return patients;
  }

  @CatchErrors()
  async findBySpecie( specie: string ) {
    
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
