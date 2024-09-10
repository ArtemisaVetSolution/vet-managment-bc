import { Module } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorsController } from './collaborators.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaborator } from './entities/collaborator.entity';

@Module({
  controllers: [CollaboratorsController],
  providers: [CollaboratorsService],
  imports: [TypeOrmModule.forFeature([Collaborator])],
})
export class CollaboratorsModule {}
