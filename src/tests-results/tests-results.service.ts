import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestResultDto } from './dto/create-test-result.dto';
import { UpdateTestResultDto } from './dto/update-test-result.dto';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { TestResult } from './entities/test-result.entity';
import { Repository } from 'typeorm';
import { PatientsService } from 'src/patients/patients.service';
import { ServicesService } from 'src/services/services.service';
import { TestResultQueryDto } from './dto/test-result-query.dto';
import { Response } from 'express';
import { join } from 'path';
import { createReadStream, existsSync } from 'fs';

@Injectable()
@CatchErrors()
export class TestsResultsService {
  constructor(
    @InjectRepository(TestResult) private testsResultsRepository: Repository<TestResult>,
    private patientsService: PatientsService,
    private servicesService: ServicesService
  ) { }

  async create(createTestResultDto: CreateTestResultDto) {
    const patient = await this.patientsService.findOne(createTestResultDto.patientId);
    const service = await this.servicesService.findOne(createTestResultDto.serviceId);

    const newResult = this.testsResultsRepository.create({
      fileName: createTestResultDto.file.filename,
      fileMimetype: createTestResultDto.file.mimetype,
      filePath: createTestResultDto.file.path,
      date: createTestResultDto.date,
      patient,
      service
    });

    return await this.testsResultsRepository.save(newResult);
  }

  async findAllOrFilter(queryDto: TestResultQueryDto) {

    const query = this.testsResultsRepository.createQueryBuilder('test')
      .leftJoinAndSelect('test.service', 'service')
      .leftJoinAndSelect('test.patient', 'patient')

    if (queryDto.patientId) {
      const patient = await this.patientsService.findOne(queryDto.patientId);
      query.andWhere('test.patient = :patient', { patient: patient.id })
    }

    if (queryDto.serviceId) {
      const service = await this.servicesService.findOne(queryDto.serviceId);
      query.andWhere('test.service = :service', { service: service.id });
    }

    if (queryDto.date) {
      query.andWhere('test.date = :date', { date: queryDto.date })
    }

    return await query.getMany();
  }

  async findOne(id: number) {
    const result = await this.testsResultsRepository.findOne({ where: { id }, relations: ['service', 'patient']});

    if(!result) throw new NotFoundException('Diagnostic aid result not found');

    return result;
  }

  async update(id: number, updateTestResultDto: UpdateTestResultDto) {
    const result = await this.testsResultsRepository.update(id, updateTestResultDto);

    if (!result.affected) throw new NotFoundException('Patient not found');

    return await this.testsResultsRepository.findOne({ where: { id } });
  }

  async downloadFile(id: number, res: Response) {
    const result = await this.findOne(id);
    const path = join(process.cwd(), result.filePath
  );

  if (!existsSync(path)) {
    throw new NotFoundException('File not found on the server');
  }


    const mimetype = result.fileMimetype;

    const file = createReadStream(path);
    res.set({
      'Content-Type': mimetype,
      'Content-Disposition': `inline; filename="${result.fileName}"`
    })

    return file.pipe(res);
  }
}
