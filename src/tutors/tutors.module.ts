import { Module } from '@nestjs/common';
import { TutorsService } from './tutors.service';
import { TutorsController } from './tutors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutor } from './entities/tutor.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tutor]), CommonModule],
  controllers: [TutorsController],
  exports: [TutorsService],
  providers: [TutorsService],
})
export class TutorsModule {}
