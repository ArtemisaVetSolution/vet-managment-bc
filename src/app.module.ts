import { Module } from '@nestjs/common';
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
  ],
  providers: [
    LoggerService,
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
export class AppModule {}
