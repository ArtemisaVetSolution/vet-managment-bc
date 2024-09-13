import { Module } from '@nestjs/common';
import { InterceptorsModule } from './interceptors/interceptors.module';
import { AxiosHttpAdapter } from './http/axios-http-adapter';

@Module({
    providers: [
        {
            provide: 'IHttpAdapter',
            useClass: AxiosHttpAdapter,
          }
    ],
    imports: [
        InterceptorsModule
    ],
    exports: [
        InterceptorsModule,
        'IHttpAdapter'
    ]
})

export class CommonModule {}
