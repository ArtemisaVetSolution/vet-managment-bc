import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Patient } from 'src/patients/entities/patient.entity';
import { Tutor } from 'src/tutors/entities/tutor.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Collaborator } from 'src/appointments/entities/collaborator.entity';
import { Service } from 'src/appointments/entities/service.entity';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [Patient, Tutor, Appointment, Collaborator, Service],
      synchronize: true, // Solo para desarrollo, no usar en producción
    };
  }
}
