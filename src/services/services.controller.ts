import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ApiDocCreateService, ApiDocDeleteService, ApiDocGetOneService, ApiDocGetServices, ApiDocUpdateService } from './decorators/services.decorators';
import { CreatedServiceResponseDto, ServiceDto } from './dto/response-create-service';

@ApiTags('Services')
@ApiExtraModels(CreatedServiceResponseDto)
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiDocCreateService(ServiceDto)
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @ApiDocGetServices(ServiceDto)
  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @ApiDocGetOneService(ServiceDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @ApiDocUpdateService(ServiceDto)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @ApiDocDeleteService(ServiceDto)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
