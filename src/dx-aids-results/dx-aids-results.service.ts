import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDxAidsResultDto } from './dto/create-dx-aids-result.dto';
import { UpdateDxAidsResultDto } from './dto/update-dx-aids-result.dto';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { DxAidsResult } from './entities/dx-aids-result.entity';
import { Repository } from 'typeorm';
import { PatientsService } from 'src/patients/patients.service';
import { ServicesService } from 'src/services/services.service';
import { DxAidsQueryDto } from './dto/dx-aids-query.dto';

@Injectable()
export class DxAidsResultsService {
  constructor(
    @InjectRepository(DxAidsResult) private dxAidsResultsRepository: Repository<DxAidsResult>,
    private patientsService: PatientsService,
    private servicesService: ServicesService
  ) { }

  @CatchErrors()
  async create(createDxAidsResultDto: CreateDxAidsResultDto) {
    const patient = await this.patientsService.findOne(createDxAidsResultDto.patientId);
    const service = await this.servicesService.findOne(createDxAidsResultDto.serviceId);

    const newResult = this.dxAidsResultsRepository.create({
      result: createDxAidsResultDto.result,
      date: createDxAidsResultDto.date,
      patient,
      service
    });

    return await this.dxAidsResultsRepository.save(newResult);
  }

  @CatchErrors()
  async findAllOrFilter(queryDto: DxAidsQueryDto) {

    const query = this.dxAidsResultsRepository.createQueryBuilder('dxAids')
      .leftJoinAndSelect('dxAids.service', 'service')
      .leftJoinAndSelect('dxAids.patient', 'patient')

    if (queryDto.patientId) {
      const patient = await this.patientsService.findOne(queryDto.patientId);
      query.andWhere('dxAids.patient = :patient', { patient: patient.id })
    }

    if (queryDto.serviceId) {
      const service = await this.servicesService.findOne(queryDto.serviceId);
      query.andWhere('dxAids.service = :service', { service: service.id });
    }

    if (queryDto.date) {
      query.andWhere('dxAids.date = :date', { date: queryDto.date })
    }

    return await query.getMany();
  }

  @CatchErrors()
  async findOne(id: number) {
    const result = await this.dxAidsResultsRepository.findOne({ where: { id }, relations: ['service', 'patient']});

    if(!result) throw new NotFoundException('Diagnostic aid result not found');

    return result;
  }

  @CatchErrors()
  async update(id: number, updateDxAidsResultDto: UpdateDxAidsResultDto) {
    const result = await this.dxAidsResultsRepository.update(id, updateDxAidsResultDto);

    if (!result.affected) throw new NotFoundException('Patient not found');

    return await this.dxAidsResultsRepository.findOne({ where: { id } });
  }
}
