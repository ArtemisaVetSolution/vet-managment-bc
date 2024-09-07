import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Shift } from "./entities/shift.entity";


@Injectable()
export class ShiftsSeedService {
  constructor(
    @InjectRepository(Shift)
    private shiftsRepository: Repository<Shift>, {
      
    }
  ) {}

  async createShifts() {
    // Create shifts
  }
}