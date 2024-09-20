import { LoggerService } from '../services/logger.service';
import { ExceptionHandlerService } from '../services/exception-handler.service';
import { HttpException } from '@nestjs/common';

export function CatchErrors() {
  return function (constructor: Function) {
    const originalMethods = Object.getOwnPropertyNames(constructor.prototype)
      .filter(method => method !== 'constructor')
      .map(method => ({
        name: method,
        descriptor: Object.getOwnPropertyDescriptor(constructor.prototype, method)
      }));

    for (const { name, descriptor } of originalMethods) {

      if (descriptor && typeof descriptor.value === 'function') {

        const originalMethod = descriptor.value;
        const metadataKeys = Reflect.getMetadataKeys(originalMethod);
        const metadata = metadataKeys.map(key => ({ key, value: Reflect.getMetadata(key, originalMethod) }));
        descriptor.value = async function name (...args: any[]) {
          const exceptionHandlerService : ExceptionHandlerService = this.exceptionHandlerService;
          const loggerService: LoggerService = this.loggerService;
          const className = constructor.name;

          if (!exceptionHandlerService) {
            console.error('ExceptionHandlerService no está disponible en el contexto');
          }
          if (!loggerService) {
            console.error('LoggerService no está disponible en el contexto');
          }

          try {

            const result = await originalMethod.apply(this, args);
            return result;
          } catch (error) {            
            const httpError = exceptionHandlerService.handleDatabaseError(error);
            throw httpError instanceof HttpException ? httpError : new HttpException(error.message || 'Internal server error desde aqui', 500);;
          }
        };
        Reflect.getMetadataKeys(originalMethod).forEach((key) => {
          const metadata = Reflect.getMetadata(key, originalMethod);
          Reflect.defineMetadata(key, metadata, descriptor.value);
        });
      }
    }
  };
}