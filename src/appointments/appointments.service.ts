import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Not, Repository } from 'typeorm';
import { PatientsService } from 'src/patients/patients.service';
import { Service } from './entities/service.entity';
import { Collaborator } from './entities/collaborator.entity';
import { AppointmentState } from 'src/common/enums/appointment-state.enum';
import { AppointmentsQueryDto } from './dto/appointments-query.dto';
import { AvailableAppointmentsDto } from './dto/available-appointments-query.dto';
import { addHours, format, parse, subHours } from 'date-fns';

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

    //Falta verificar que la cita esté dentro del shift del colaborador

    const collaborator = await this.collaboratorsRepository.findOneBy({ id: createAppointmentDto.collaboratorId })

    //check if appointment is already taken
    const appointmentExists = await this.appointmentsRepository.findOne({ where: { date: createAppointmentDto.date, time: createAppointmentDto.time, collaborator, state: Not(AppointmentState.CANCELED) } })

    if (appointmentExists) throw new ConflictException('Appointment already taken')

    const patient = await this.patientsService.findOne(createAppointmentDto.patientId)

    const service = await this.servicesRepository.findOneBy({ id: createAppointmentDto.serviceId })

    if (!service || !patient || !collaborator) throw new NotFoundException('Resources not found (service, collaborator, patient)');


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
    const appointment = await this.appointmentsRepository.findOne({ where: { id }, relations: ['service'] });
    if (!appointment) throw new NotFoundException('Appointment not found');
    return appointment;
  }

  @CatchErrors()
  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const result = await this.appointmentsRepository.update(id, updateAppointmentDto);

    if (!result.affected) throw new NotFoundException('Appointment was not found')

    return await this.appointmentsRepository.findOne({ where: { id }, relations: ['service'] });
  }

  @CatchErrors()
  async getAvailableAppointments(availableAppointmentsDto: AvailableAppointmentsDto) {
    const collaborator = await this.collaboratorsRepository.findOneBy({ id: availableAppointmentsDto.collaboratorId });
    if (!collaborator) throw new NotFoundException('Collaborator not found');

    const appointments = await this.appointmentsRepository.find({ where: { collaborator, date: availableAppointmentsDto.date } });

    const busyHours = appointments.map(appointment => appointment.time);

    const hoursList = await this.getHoursInRange(collaborator.startTime, collaborator.endTime); //luego cambiar por las horas de shift del colaborador

    const availableHours = hoursList.filter((hour) => !busyHours.includes(hour));

    return { availableHours };
  }

  @CatchErrors()
  async getHoursInRange(startTime: string, endTime: string) {
    const start = parse(startTime, 'HH:mm:ss', new Date());
    const end = subHours(parse(endTime, 'HH:mm:ss', new Date()), 1);

    const timeList: string[] = [];

    let currentTime = start;

    while (currentTime <= end) {
      timeList.push(format(currentTime, 'HH:00:00'));
      currentTime = addHours(currentTime, 1);
    }

    return timeList;
  }
}
