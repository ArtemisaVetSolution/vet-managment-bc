import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { Repository } from 'typeorm';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { ServicesService } from 'src/services/services.service';
import { ShiftsService } from 'src/shifts/shifts.service';
import axios from 'axios';  // Importa axios correctamente
import { userPath } from 'src/common/docs/users-service-path';

@Injectable()
export class CollaboratorsService {

  constructor(
    private readonly serviceService: ServicesService,
    private readonly shiftService: ShiftsService,
    @InjectRepository(Collaborator) private collaboratorRepository: Repository<Collaborator>
  ) {} 

  @CatchErrors()
  async create(createCollaboratorDto: CreateCollaboratorDto) {
    const newUser = await axios.post( userPath + '/auth/register', {
      email: createCollaboratorDto.email,
      name: createCollaboratorDto.name,
      password: createCollaboratorDto.password,
      cellphone: createCollaboratorDto.cellphone,
      role: 'collaborator'
    });
    const userId = newUser.data.data;
    let servicesExists = true;
    const services = [];
    for (const serviceId of createCollaboratorDto.servicesId) {
      const service = await this.serviceService.findOne(serviceId);
      if (!service) {
        servicesExists = false;
        break; 
      }
      services.push(service);
    }
    if (!servicesExists) {
      throw new NotFoundException('One or more services not found');
    }
    const shift = await this.shiftService.findOneByName(createCollaboratorDto.shiftName);
    if (!shift) {
      throw new NotFoundException('Shift not found');
    }
    const newCollaborator = this.collaboratorRepository.create({
      shift : shift,
      userId,
      services: services,
    });  

    return this.collaboratorRepository.save(newCollaborator);
  }

 
  @CatchErrors()
  async findAll() {
    const collaborators = await this.collaboratorRepository.find({
      relations: ['shift', 'services'],  
      withDeleted: false,
    });
    if (!collaborators) {
      throw new NotFoundException('Collaborators not found');
    }
    return collaborators;
  }

  @CatchErrors()
  async findOne(id: number) {
    const collaborator = this.collaboratorRepository.findOne({where:{id}, relations: ['shift', 'services']});
    if (!collaborator) {
      throw new NotFoundException(`Collaborator #${id} not found`);
    }
    return collaborator;
  }

  @CatchErrors()
  async findAllByShift(shiftName: string) {
    const shift = await this.shiftService.findOneByName(shiftName);
    if (!shift) {
      throw new NotFoundException('Shift not found');
    }
    const collaborators = await this.collaboratorRepository.find({where:{shift}, relations: ['shift', 'services']});
    if (!collaborators || collaborators.length === 0) {
      throw new NotFoundException('Collaborators not found');
    }
    return collaborators;
  }

  @CatchErrors()
  async restoreCollaborator(id: number): Promise<void> {
    const result = await this.collaboratorRepository.restore(id);
    if (!result.affected) {
      throw new NotFoundException(`Collaborator with ID ${id} not found`);
    }
    return;
  }

  @CatchErrors()
  async findAllByService(serviceId: number) {
    const service = await this.serviceService.findOne(serviceId);
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    const collaborators = await this.collaboratorRepository.createQueryBuilder('collaborator')
      .leftJoinAndSelect('collaborator.services', 'service')
      .where('service.id = :serviceId', {serviceId})
      .getMany();
    if (!collaborators || collaborators.length === 0) {
      throw new NotFoundException('Collaborators not found');
    }
    return collaborators;
  }

  @CatchErrors()
  async update(id: number, updateCollaboratorDto: UpdateCollaboratorDto) {
    const collaborator = await this.collaboratorRepository.findOne({where:{id}});
    if (!collaborator) {
      throw new NotFoundException(`Collaborator #${id} not found`);
    }
    let servicesExists = true;
    const services = [];
    for (const serviceId of updateCollaboratorDto.servicesId) {
      const service = await this.serviceService.findOne(serviceId);
      if (!service) {
        servicesExists = false;
        break; 
      }
      services.push(service);
    }
    if (!servicesExists) {
      throw new NotFoundException('One or more services not found');
    }
    const shift = await this.shiftService.findOneByName(updateCollaboratorDto.shiftName);
    if (!shift) {
      throw new NotFoundException('Shift not found');
    }
    collaborator.shift = shift;
    collaborator.services = services;
    return this.collaboratorRepository.save(collaborator);
  }

  @CatchErrors()
  async remove(id: number) {
    const collaborator = await this.collaboratorRepository.findOne({where:{id}});
    if (!collaborator) {
      throw new NotFoundException(`Collaborator #${id} not found`);
    }
    return this.collaboratorRepository.softDelete(collaborator);
  }
}
