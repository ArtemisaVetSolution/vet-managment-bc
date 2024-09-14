import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { TutorsService } from 'src/tutors/tutors.service';
import { AppointmentState } from 'src/common/enums';

@Injectable()
export class PaymentsService {

  constructor(
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    private readonly appointmentService: AppointmentsService,
    private readonly tutorService: TutorsService
  ) {}

  @CatchErrors()
  async create(createPaymentDto: CreatePaymentDto) {
    const appointment = await this.appointmentService.findOne(createPaymentDto.appointmentId);
    const appoimentUpdate = await this.appointmentService.update(appointment.id, { state: AppointmentState.PAID });
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
    const tutor = await this.tutorService.findOne(tutorId);
    if (!tutor) {
      throw new NotFoundException('Tutor not found');
    }
    const payments = await this.paymentRepository.find({ where: { appointment: { patient: { tutor } } } });
    return payments;
  }

  @CatchErrors()
  async findOneByAppointment(appoimentId: number) {
    const appoiment = await this.appointmentService.findOne(appoimentId);
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
    const appointment = await this.appointmentService.findOne(payment.appointment.id);
    const appoimentUpdate = await this.appointmentService.update(appointment.id, { state: AppointmentState.PENDING });
    return this.paymentRepository.softDelete(payment);
  }
}
