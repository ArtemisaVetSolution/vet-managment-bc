import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePaymentDto {

  @ApiProperty({ description: 'Appoinment id associated to this payment', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  appointmentId: number;

  @ApiProperty({ description: 'Payment date', example: new Date() })
  @IsDate()
  @IsNotEmpty()
  date: Date;
  
}
