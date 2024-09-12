import { Module } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shift } from './entities/shift.entity';

@Module({
  providers: [ShiftsService],
  exports: [ShiftsService],
  imports: [TypeOrmModule.forFeature([Shift])],
})
export class ShiftsModule {}
