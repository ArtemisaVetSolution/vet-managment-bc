import { Module } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorsController } from './collaborators.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { ServicesService } from 'src/services/services.service';
import { Service } from 'src/services/entities/service.entity';

@Module({
  controllers: [CollaboratorsController],
  providers: [CollaboratorsService, ServicesService],
  imports: [TypeOrmModule.forFeature([Collaborator]), TypeOrmModule.forFeature([Service])],
})
export class CollaboratorsModule {}
