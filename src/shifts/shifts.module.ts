import { Module } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shift } from './entities/shift.entity';
import { LoggerService } from 'src/common/services';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';

@Module({
  providers: [ShiftsService, LoggerService, ExceptionHandlerService],
  exports: [ShiftsService],
  imports: [TypeOrmModule.forFeature([Shift])],
})
export class ShiftsModule {}
