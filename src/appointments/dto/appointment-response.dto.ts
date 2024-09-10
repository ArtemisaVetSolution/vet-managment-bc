import { ApiProperty } from "@nestjs/swagger";
import { AppointmentState } from "src/common/enums/appointment-state.enum";

export class AppointmentResponseDto {
    @ApiProperty({ description: 'ID', example: 1 })
    id: number;

    @ApiProperty({ example: '2024-12-05' })
    date: Date;

    @ApiProperty({ example: '08:00:00' })
    time: string;

    @ApiProperty({ example: 45000 })
    totalPrice: number;

    @ApiProperty({ example: 'Pagada' })
    state: AppointmentState;

    @ApiProperty({ example: 'Consulta general'})
    service: string;
}