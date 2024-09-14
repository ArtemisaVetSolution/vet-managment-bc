import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { PathName, VerifyAuthService } from 'src/common/decorators/auth.decorator';
import { Leave, Path } from 'src/common/enums';
import { ApiDocCreatePayment } from './decorators/payments.decorators';

@ApiTags('Payments')
@ApiExtraModels(CreatePaymentDto)
@PathName(Path.PAYMENTS)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiDocCreatePayment(CreatePaymentDto)
  @VerifyAuthService(Leave.CAN_CREATE)
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.paymentsService.findOne(+id);
  // }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
