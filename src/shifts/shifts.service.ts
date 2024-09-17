import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shift } from './entities/shift.entity';
import { Repository } from 'typeorm';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';

@Injectable()
@CatchErrors()
export class ShiftsService {

  constructor(
    @InjectRepository(Shift) private readonly shiftRepository: Repository<Shift>
  ) {}

  create(createShiftDto: CreateShiftDto) {
    return 'This action adds a new shift';
  }

  findAll() {
    
    return `This action returns all shifts`;
  }

  async findOneByName(name: string) {
    const shift = await this.shiftRepository.findOne({where: {name}});
    if (!shift) {
      throw new NotFoundException(`Shift #${name} not found`);
    }
    return shift;
  }

  async findOne(id: number) {
    const shift = await this.shiftRepository.findOne({where:{id}});
    if (!shift) {
      throw new NotFoundException(`Shift #${id} not found`);
    }
    return shift;
  }

  update(id: number, updateShiftDto: UpdateShiftDto) {
    return `This action updates a #${id} shift`;
  }

  remove(id: number) {
    return `This action removes a #${id} shift`;
  }
}
