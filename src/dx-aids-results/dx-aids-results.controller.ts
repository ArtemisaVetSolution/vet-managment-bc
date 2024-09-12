import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DxAidsResultsService } from './dx-aids-results.service';
import { CreateDxAidsResultDto } from './dto/create-dx-aids-result.dto';
import { UpdateDxAidsResultDto } from './dto/update-dx-aids-result.dto';

@Controller('dx-aids-results')
export class DxAidsResultsController {
  constructor(private readonly dxAidsResultsService: DxAidsResultsService) {}

  @Post()
  create(@Body() createDxAidsResultDto: CreateDxAidsResultDto) {
    return this.dxAidsResultsService.create(createDxAidsResultDto);
  }

  @Get()
  findAll() {
    return this.dxAidsResultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dxAidsResultsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDxAidsResultDto: UpdateDxAidsResultDto) {
    return this.dxAidsResultsService.update(+id, updateDxAidsResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dxAidsResultsService.remove(+id);
  }
}
