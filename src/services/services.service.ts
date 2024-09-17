import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { Repository } from 'typeorm';
import { IHttpAdapter } from 'src/common/interfaces';

@Injectable()
@CatchErrors()
export class ServicesService {
  constructor(
    @InjectRepository(Service) private readonly serviceRepository: Repository<Service>,
    // @Inject('IHttpAdapter') private readonly httpAdapter: IHttpAdapter 
  ) {}

  
  async create(createServiceDto: CreateServiceDto) {
    const newService = this.serviceRepository.create(createServiceDto);
    return this.serviceRepository.save(newService);
  }

  
  findAll() {
    const services = this.serviceRepository.find();
    if (!services) {
      throw new NotFoundException('No services found');
    }
    return services;
  }

  
  async findOne(id: number) {
    const service = await this.serviceRepository.findOne({where:{id}});
    if (!service) {
      throw new NotFoundException(`Service #${id} not found`);
    }
    return service;
  }

  
  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  
  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
