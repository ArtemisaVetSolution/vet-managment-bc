import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tutor } from './entities/tutor.entity';
import { Repository } from 'typeorm';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';

@Injectable()
export class TutorsService {
  constructor(
    @InjectRepository(Tutor) private tutorsRepository: Repository<Tutor>
  ) { }

  @CatchErrors()
  async create(createTutorDto: CreateTutorDto) {
    //debo hacer fetch de users, enviar los datos que create user dto reciba, luego obtener el id recibido para poder crear el tutor.

    const userId = 1 //Por ahora un mock

    const newTutor = this.tutorsRepository.create({ identificationNumber: createTutorDto.identificationNumber, userId, name: createTutorDto.name });
    return await this.tutorsRepository.save(newTutor);
  }

  @CatchErrors()
  async findAll() {
    const tutors = await this.tutorsRepository.find();

    if(!tutors.length) throw new NotFoundException('No tutors were found');

    return tutors;
  }

  @CatchErrors()
  async findOne(id: number) {
    const tutor = await this.tutorsRepository.findOne({ where: {id}, relations: ['patients']});

    if(!tutor) throw new NotFoundException('Tutor not found');

    return tutor;
  }

  @CatchErrors()
  async update(id: number, updateTutorDto: UpdateTutorDto) {

    //Falta update en users
    const result = await this.tutorsRepository.update(id, updateTutorDto);

    if(!result.affected) throw new NotFoundException('Tutor was not found');

    return await this.findOne(id);
  }

  @CatchErrors()
  async remove(id: number) {
    const tutor = await this.findOne(id);

    await this.tutorsRepository.softDelete(id);

    return tutor;
  }
}
