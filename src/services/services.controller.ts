import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ApiDocCreateService, ApiDocDeleteService, ApiDocGetOneService, ApiDocGetServices, ApiDocUpdateService } from './decorators/services.decorators';
import { CreatedServiceResponseDto, ServiceDto } from './dto/response-create-service';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { PathName, VerifyAuthService } from 'src/common/decorators/auth.decorator';
import { Leave, Path } from 'src/common/enums';
import { LoggerService } from 'src/common/services';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';

@ApiTags('Services')
@ApiExtraModels(CreatedServiceResponseDto)
@PathName(Path.SERVICES)
@Controller('services')
export class ServicesController {
  constructor(
    private readonly servicesService: ServicesService,
  ) {}

  @ApiDocCreateService(ServiceDto)
  // @VerifyAuthService(Leave.CAN_CREATE)
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @ApiDocGetServices(ServiceDto)
  @VerifyAuthService(Leave.CAN_READ)
  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @ApiDocGetOneService(ServiceDto)
  @VerifyAuthService(Leave.CAN_READ)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @ApiDocUpdateService(ServiceDto)
  @VerifyAuthService(Leave.CAN_UPDATE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @ApiDocDeleteService(ServiceDto)
  @VerifyAuthService(Leave.CAN_DELETE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
