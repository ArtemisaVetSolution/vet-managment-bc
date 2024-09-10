import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { PatientsService } from 'src/patients/patients.service';
import { Service } from './entities/service.entity';
import { Collaborator } from './entities/collaborator.entity';
import { AppointmentState } from 'src/common/enums/appointment-state.enum';
import { AppointmentsQueryDto } from './dto/appointments-query.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment) private appointmentsRepository: Repository<Appointment>,
    @InjectRepository(Service) private servicesRepository: Repository<Service>,
    @InjectRepository(Collaborator) private collaboratorsRepository: Repository<Collaborator>,
    private patientsService: PatientsService
  ) { }

  @CatchErrors()
  async create(createAppointmentDto: CreateAppointmentDto) {

    const service = await this.servicesRepository.findOneBy({ id: createAppointmentDto.serviceId })

    const collaborator = await this.collaboratorsRepository.findOneBy({ id: createAppointmentDto.collaboratorId })

    const patient = await this.patientsService.findOne(createAppointmentDto.patientId)

    if(!service || !patient || !collaborator) throw new NotFoundException('Resources not found (service, collaborator, patient)');

    const newAppointment = this.appointmentsRepository.create({
      ...createAppointmentDto,
      state: AppointmentState.PENDING,
      service,
      collaborator,
      patient
    })

    return await this.appointmentsRepository.save(newAppointment);
  }

  @CatchErrors()
  async findAllOrFilter(appointmentQuery: AppointmentsQueryDto) {
    const query = this.appointmentsRepository.createQueryBuilder('appointment');

    if (appointmentQuery.patientId) {
      const patient = await this.patientsService.findOne(appointmentQuery.patientId);
      query.andWhere('appointment.patient = :patient', { patient: patient.id });
    }

    if (appointmentQuery.serviceId) {
      const service = await this.servicesRepository.findOneBy({ id: appointmentQuery.serviceId });

      if (!service) throw new NotFoundException('Service not found');

      query.andWhere('appointment.service = :service', { service: service.id });
    }

    if (appointmentQuery.date) {
      query.andWhere('appointment.date = :date', { date: appointmentQuery.date })
    }

    return await query.getMany();
  }

  @CatchErrors()
  async findOne(id: number) {
    const appointment = await this.appointmentsRepository.findOne({ where: {id }, relations: ['service']});
    if (!appointment) throw new NotFoundException('Appointment not found');
    return appointment;
  }

  @CatchErrors()
  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const result = await this.appointmentsRepository.update(id, updateAppointmentDto);

    if (!result.affected) throw new NotFoundException('Appointment was not found')

    return await this.appointmentsRepository.findOne({ where: {id }, relations: ['service']});
  }
}
