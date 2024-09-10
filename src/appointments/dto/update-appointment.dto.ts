import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointment.dto';
import { AppointmentState } from 'src/common/enums/appointment-state.enum';
import { IsEnum } from 'class-validator';

export class UpdateAppointmentDto {
    @ApiProperty({ description: 'New state of the appointment (Pendiente, En progreso, Pagada, Cancelada)'})
    @IsEnum(AppointmentState)
    state: AppointmentState;
}
