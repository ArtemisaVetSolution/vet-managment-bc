import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { AppointmentState } from 'src/common/enums';
import { Tutor } from 'src/tutors/entities/tutor.entity';
import { Patient } from 'src/patients/entities/patient.entity';

@Injectable()
export class PaymentsService {

  constructor(
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    @InjectRepository(Appointment) private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Tutor) private tutorRepository: Repository<Tutor>,
    @InjectRepository(Patient) private patientRepository: Repository<Patient>
  ) {}

  @CatchErrors()
  async create(createPaymentDto: CreatePaymentDto) {
    const appointment = await this.appointmentRepository.findOne({where: {id:createPaymentDto.appointmentId}});
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    const appoimentUpdate = await this.appointmentRepository.save({...appointment, state: AppointmentState.PAID});
    const newPayment = this.paymentRepository.create({
      date: createPaymentDto.date,
      appointment: appoimentUpdate
    });
    return this.paymentRepository.save(newPayment);
  }

  @CatchErrors()
  async findAll() {
    const payments = await this.paymentRepository.find();
    if (!payments) {
      throw new NotFoundException('Payments not found');
    }
    return payments;
  }

  @CatchErrors()
  async findOneByTutor(tutorId: number) {
    const tutor = await this.tutorRepository.findOne({where: {id:tutorId}});
    if (!tutor) {
      throw new NotFoundException('Tutor not found');
    }
    const payments = await this.paymentRepository.find({ where: { appointment: { patient: { tutor } } } });
    if (!payments) {
      throw new NotFoundException('Payments not found');
    }
    return payments;
  }

  @CatchErrors()
  async findOneByAppointment(appoimentId: number) {
    const appoiment = await this.appointmentRepository.findOne({where: {id:appoimentId}});
    const payment = await this.paymentRepository.findOne({ where: { appointment: appoiment } });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }


  @CatchErrors()
  async remove(id: number) {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    const appointment = await this.appointmentRepository.findOne({where: {id:payment.appointment.id}});
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    await this.appointmentRepository.save({...appointment, state: AppointmentState.PENDING});
    return this.paymentRepository.softDelete(payment);
  }
}
