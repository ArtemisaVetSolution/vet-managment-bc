import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { Repository } from 'typeorm';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { ServicesService } from 'src/services/services.service';
import { ShiftsService } from 'src/shifts/shifts.service';

@Injectable()
export class CollaboratorsService {

  constructor(
    private readonly serviceService: ServicesService,
    private readonly shiftService: ShiftsService,
    @InjectRepository(Collaborator) private collaboratorRepository: Repository<Collaborator>
  ) {} 

  @CatchErrors()
  async create(createCollaboratorDto: CreateCollaboratorDto) {
    let servicesExists = true;
    for (const serviceId of createCollaboratorDto.servicesId) {
      const service = await this.serviceService.findOne(serviceId);
      if (!service) {
        servicesExists = false;
        break; 
      }
    }

    if (!servicesExists) {
      throw new NotFoundException('One or more services not found');
    }
    const shift = await this.shiftService.findOne(createCollaboratorDto.shiftId);

    if (!shift) {
      throw new NotFoundException('Shift not found');
    }

    const newCollaborator = this.collaboratorRepository.create({
      shift : shift
    });  
    


    return this.collaboratorRepository.save(newCollaborator);
  }

  findAll() {
    return `This action returns all collaborators`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collaborator`;
  }

  update(id: number, updateCollaboratorDto: UpdateCollaboratorDto) {
    return `This action updates a #${id} collaborator`;
  }

  remove(id: number) {
    return `This action removes a #${id} collaborator`;
  }
}
