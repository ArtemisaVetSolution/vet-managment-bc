import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService, envValidationSchema } from './common/config/index';
import { LoggerService } from './common/services/index';
import { AllExceptionsFilter, ValidationExceptionFilter } from './common/errors/exception-filters';
import { InterceptorsModule } from './common/interceptors/interceptors.module';
import { CommonModule } from './common/common.module';
import { CollaboratorsModule } from './collaborators/collaborators.module';
import { ShiftsModule } from './shifts/shifts.module';
import { ServicesModule } from './services/services.module';
import { ShiftSeeder } from './common/seeds/shifts.seed';
import { Shift } from './shifts/entities/shift.entity';
import { Service } from './services/entities/service.entity';
import { ServiceSeeder } from './common/seeds/services.seed';
import { PatientsModule } from './patients/patients.module';
import { TutorsModule } from './tutors/tutors.module';
import { AppointmentsModule } from './appointments/appointments.module';




@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envValidationSchema,
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfigService
    }),
    InterceptorsModule,
    CommonModule,
    CollaboratorsModule,
    ShiftsModule,
    ServicesModule,
    TypeOrmModule.forFeature([Shift, Service]),
    PatientsModule,
    TutorsModule,
    AppointmentsModule,
  ],
  providers: [
    LoggerService,
    ShiftSeeder,
    ServiceSeeder,
    {
      provide: 'APP_FILTER',
      useClass: AllExceptionsFilter,
    },
    {
      provide: 'APP_FILTER',
      useClass: ValidationExceptionFilter,
    },
    {
      provide: 'ILoggerService',
      useClass: LoggerService,
    }
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly shiftSeeder: ShiftSeeder,
    private readonly serviceSeeder: ServiceSeeder
  ) {}

  async onModuleInit() {
    console.log('AppModule initialized. Seeding database...');
    await this.shiftSeeder.seed();
    await this.serviceSeeder.seed();
  }
}
