import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';

import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { Tutor } from './entities/tutor.entity';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { userPath } from 'src/common/docs/users-service-path';

@Injectable()
export class TutorsService {
  constructor(
    @InjectRepository(Tutor) private tutorsRepository: Repository<Tutor>
  ) { }

  @CatchErrors()
  async create(createTutorDto: CreateTutorDto) {
    const newUser = await axios.post(userPath + '/auth/register', {
      email: createTutorDto.email,
      name: createTutorDto.name,
      password: createTutorDto.password,
      cellphone: createTutorDto.cellphone
    });

    const userId = newUser.data.data;

    const newTutor = this.tutorsRepository.create({ identificationNumber: createTutorDto.identificationNumber, userId, name: createTutorDto.name });
    return await this.tutorsRepository.save(newTutor);
  }

  @CatchErrors()
  async findAll() {
    const tutors = await this.tutorsRepository.find();

    if (!tutors.length) throw new NotFoundException('No tutors were found');

    return tutors;
  }

  @CatchErrors()
  async findOne(id: number) {
    const tutor = await this.tutorsRepository.findOne({ where: { id }, relations: ['patients'] });

    if (!tutor) throw new NotFoundException('Tutor not found');

    return tutor;
  }

  @CatchErrors()
  async update(id: number, updateTutorDto: UpdateTutorDto) {

    //Falta update en users
    const result = await this.tutorsRepository.update(id, updateTutorDto);

    if (!result.affected) throw new NotFoundException('Tutor was not found');

    return await this.findOne(id);
  }

  @CatchErrors()
  async remove(id: number) {
    const tutor = await this.findOne(id);

    await this.tutorsRepository.softDelete(id);

    return tutor;
  }
}
