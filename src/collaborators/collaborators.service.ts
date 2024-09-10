import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { Repository } from 'typeorm';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { ServicesService } from 'src/services/services.service';

@Injectable()
export class CollaboratorsService {

  constructor(
    private readonly serviceService: ServicesService,
    @InjectRepository(Collaborator) private collaboratorRepository: Repository<Collaborator>
  ) {} 

  @CatchErrors()
  create(createCollaboratorDto: CreateCollaboratorDto) {
    let servicesExists = true;
    createCollaboratorDto.servicesId.forEach(service => {
      let id = null;
      id = await this.serviceService.findOne(service);
      if (!id) {
        servicesExists = false;
      }
    });
    if (!servicesExists) throw new NotFoundException('Services not founds')
    return this.collaboratorRepository.save(createCollaboratorDto);
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
