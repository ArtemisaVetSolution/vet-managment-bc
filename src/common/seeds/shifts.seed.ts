import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Shift } from "src/shifts/entities/shift.entity";
import { Repository } from "typeorm";


@Injectable()
export class ShiftSeeder {
  constructor(
    @InjectRepository (Shift) private readonly shiftRepository: Repository<Shift>
  ) {}

  async seed() {
    const shifts = [
      {
        name: 'Morning',
        startTime: '08:00',
        endTime: '16:00'
      },
      {
        name: 'Afternoon',
        startTime: '16:00',
        endTime: '00:00'
      },
      {
        name: 'Night',
        startTime: '00:00',
        endTime: '08:00'
      }
    ];

    for (const shift of shifts) {
      const shiftExists = await this.shiftRepository.findOneBy({name: shift.name});
      if (!shiftExists) {
        const newShift = this.shiftRepository.create(shift);
        await this.shiftRepository.save(newShift);
        console.log(`Shift ${shift.name} created`);
      } else {
        // console.log(`Shift ${shift.name} already exists`);
      }
    }
  }
}