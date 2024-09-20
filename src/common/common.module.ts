import { Module } from '@nestjs/common';
import { InterceptorsModule } from './interceptors/interceptors.module';
import { AxiosHttpAdapter } from './http/axios-http-adapter';
import { LoggerService } from './services';
import { ExceptionHandlerService } from './services/exception-handler.service';

@Module({
    providers: [
        {
            provide: 'IHttpAdapter',
            useClass: AxiosHttpAdapter,
            
          },
          ExceptionHandlerService,
          LoggerService
    ],
    imports: [
        InterceptorsModule,
        
        
    ],
    exports: [
        InterceptorsModule,
        'IHttpAdapter',
        LoggerService,
        ExceptionHandlerService,
    ]
})

export class CommonModule {}
