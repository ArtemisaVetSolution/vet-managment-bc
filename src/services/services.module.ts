import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService],
  exports: [ServicesService],
  imports: [TypeOrmModule.forFeature([Service]), CommonModule],
})
export class ServicesModule {}
