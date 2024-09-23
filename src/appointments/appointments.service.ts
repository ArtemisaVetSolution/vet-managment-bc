import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Not, Repository } from 'typeorm';
import { PatientsService } from 'src/patients/patients.service';
import { AppointmentState } from 'src/common/enums/appointment-state.enum';
import { AppointmentsQueryDto } from './dto/appointments-query.dto';
import { AvailableAppointmentsDto } from './dto/available-appointments-query.dto';
import { addHours, format, parse, subHours } from 'date-fns';
import { Service } from 'src/services/entities/service.entity';
import { Collaborator } from 'src/collaborators/entities/collaborator.entity';
import { IConfirmationAppoitmentService } from 'src/mail-sender/interfaces/confirmation-appoitment-service.interface';
import { LoggerService } from 'src/common/services';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';
import { TutorsService } from 'src/tutors/tutors.service';
import { CollaboratorsService } from 'src/collaborators/collaborators.service';
import { Tutor } from 'src/tutors/entities/tutor.entity';


@Injectable()
@CatchErrors()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment) private appointmentsRepository: Repository<Appointment>,
    @InjectRepository(Service) private servicesRepository: Repository<Service>,
    @InjectRepository(Collaborator) private collaboratorsRepository: Repository<Collaborator>,
    @InjectRepository(Tutor) private tutorsRepository: Repository<Tutor>,
    private patientsService: PatientsService,
    private collaboratorsService: CollaboratorsService,
    @Inject('IConfirmationAppoitmentService')
    private readonly confirmationAppoitmentService: IConfirmationAppoitmentService,
    @Inject(LoggerService)
    public readonly loggerService: LoggerService,
    @Inject(ExceptionHandlerService)
    public readonly exceptionHandlerService: ExceptionHandlerService,
  ) { }

  async create(createAppointmentDto: CreateAppointmentDto, email: string) {

    const collaborator = await this.collaboratorsRepository.findOne({ where: { id: createAppointmentDto.collaboratorId }, relations: ['shift'] });

    if (!collaborator)
      throw new NotFoundException('Collaborator not found');

    const collaboratorShift = await this.getHoursInRange(collaborator.shift.startTime, collaborator.shift.endTime);

    if (!collaboratorShift.includes(createAppointmentDto.time)) throw new BadRequestException('Time is not on collaborator shift');

    //check if appointment is already taken
    const appointmentExists = await this.appointmentsRepository.findOne({ where: { date: createAppointmentDto.date, time: createAppointmentDto.time, collaborator, state: Not(AppointmentState.CANCELED) } })

    if (appointmentExists) throw new ConflictException('Appointment already taken');

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
    console.log(newAppointment);

    const formattedDate = newAppointment.date.toISOString().split('T')[0];

    const sendEmail = await this.confirmationAppoitmentService.sendConfirmationEmail(email, patient.tutor.name, formattedDate, newAppointment.time, collaborator.name, patient.name, service.name)
    console.log(sendEmail);


    return await this.appointmentsRepository.save(newAppointment);
  }


  async findAllOrFilter(appointmentQuery: AppointmentsQueryDto) {
    const query = this.appointmentsRepository.createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .leftJoinAndSelect('appointment.service', 'service')
      .leftJoinAndSelect('appointment.collaborator', 'collaborator');

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

    if (appointmentQuery.tutorId) {
      const patients = await this.patientsService.findWithQueryParams({ tutorId: appointmentQuery.tutorId });
      const patientIds = patients.map(patient => patient.id);

      if (patientIds.length > 0) {
        // Usa IN para buscar todas las citas que tengan pacientes en la lista de ids
        query.andWhere('appointment.patient IN (:...patientIds)', { patientIds });
      }
    }

    if(appointmentQuery.tutorIdentification) {
      const tutor = await this.tutorsRepository.findOne({ where: {identificationNumber: appointmentQuery.tutorIdentification}});
      const patients = await this.patientsService.findWithQueryParams({ tutorId: tutor.id });
      const patientIds = patients.map(patient => patient.id);

      if (patientIds.length > 0) {
        // Usa IN para buscar todas las citas que tengan pacientes en la lista de ids
        query.andWhere('appointment.patient IN (:...patientIds)', { patientIds });
      }
    }

    if (appointmentQuery.collaboratorId) {
      const collaborator = await this.collaboratorsService.findOne(appointmentQuery.collaboratorId);
      query.andWhere('collaborator.id = :collaboratorId', { collaboratorId: appointmentQuery.collaboratorId });
    }

    if (appointmentQuery.state) {

      query.andWhere('appointment.state = :state', { state: appointmentQuery.state });
    }

    return await query.getMany();
  }


  async findOne(id: number) {
    const appointment = await this.appointmentsRepository.findOne({ where: { id }, relations: ['service'] });
    if (!appointment) throw new NotFoundException('Appointment not found');
    return appointment;
  }


  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const result = await this.appointmentsRepository.update(id, updateAppointmentDto);

    if (!result.affected) throw new NotFoundException('Appointment was not found')

    return await this.appointmentsRepository.findOne({ where: { id }, relations: ['service'] });
  }


  async getAvailableAppointments(availableAppointmentsDto: AvailableAppointmentsDto) {
    const collaborator = await this.collaboratorsRepository.findOne({ where: { id: availableAppointmentsDto.collaboratorId }, relations: ['shift'] });

    if (!collaborator) throw new NotFoundException('Collaborator not found');

    const appointments = await this.appointmentsRepository.find({ where: { collaborator, date: availableAppointmentsDto.date } });

    const busyHours = appointments.map(appointment => appointment.time);

    const hoursList = await this.getHoursInRange(collaborator.shift.startTime, collaborator.shift.endTime);

    const availableHours = hoursList.filter((hour) => !busyHours.includes(hour));

    return { availableHours };
  }


  async getHoursInRange(startTime: string, endTime: string) {
    const start = parse(startTime, 'HH:mm', new Date());
    const end = subHours(parse(endTime, 'HH:mm', new Date()), 1);

    const timeList: string[] = [];

    let currentTime = start;

    while (currentTime <= end) {
      timeList.push(format(currentTime, 'HH:00'));
      currentTime = addHours(currentTime, 1);
    }

    return timeList;
  }
}
