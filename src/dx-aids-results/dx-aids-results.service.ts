import { Injectable } from '@nestjs/common';
import { CreateDxAidsResultDto } from './dto/create-dx-aids-result.dto';
import { UpdateDxAidsResultDto } from './dto/update-dx-aids-result.dto';

@Injectable()
export class DxAidsResultsService {
  create(createDxAidsResultDto: CreateDxAidsResultDto) {
    return 'This action adds a new dxAidsResult';
  }

  findAll() {
    return `This action returns all dxAidsResults`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dxAidsResult`;
  }

  update(id: number, updateDxAidsResultDto: UpdateDxAidsResultDto) {
    return `This action updates a #${id} dxAidsResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} dxAidsResult`;
  }
}
