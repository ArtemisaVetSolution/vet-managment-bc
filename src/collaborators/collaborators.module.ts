import { Module } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorsController } from './collaborators.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { ServicesService } from 'src/services/services.service';
import { Service } from 'src/services/entities/service.entity';
import { ShiftsService } from 'src/shifts/shifts.service';
import { Shift } from 'src/shifts/entities/shift.entity';
import { CommonModule } from 'src/common/common.module';


@Module({
  controllers: [CollaboratorsController],
  providers: [CollaboratorsService, ServicesService, ShiftsService],
  imports: [TypeOrmModule.forFeature([Collaborator]), TypeOrmModule.forFeature([Service]), TypeOrmModule.forFeature([Shift]),
  CommonModule],
  exports: [CollaboratorsService]
})
export class CollaboratorsModule {}
