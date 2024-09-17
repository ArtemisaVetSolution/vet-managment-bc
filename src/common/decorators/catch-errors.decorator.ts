import { LoggerService } from '../services/logger.service';
import { ExceptionHandlerService } from '../services/exception-handler.service';

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

          try {

            const result = await originalMethod.apply(this, args);
            return result;
          } catch (error) {
            loggerService.error(
              `Error in ${className}.${name}: ${error.message}`,
            );

            const httpException = exceptionHandlerService.handleDatabaseError(error);
            throw httpException;
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