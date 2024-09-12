import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DxAidsResultsService } from './dx-aids-results.service';
import { CreateDxAidsResultDto } from './dto/create-dx-aids-result.dto';
import { UpdateDxAidsResultDto } from './dto/update-dx-aids-result.dto';
import { DxAidsQueryDto } from './dto/dx-aids-query.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tests Results')
@Controller('tests-results')
export class DxAidsResultsController {
  constructor(private readonly dxAidsResultsService: DxAidsResultsService) {}

  @Post()
  create(@Body() createDxAidsResultDto: CreateDxAidsResultDto) {
    return this.dxAidsResultsService.create(createDxAidsResultDto);
  }

  @Get()
  findAllOrFilter(@Query() query: DxAidsQueryDto) {
    return this.dxAidsResultsService.findAllOrFilter(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dxAidsResultsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDxAidsResultDto: UpdateDxAidsResultDto) {
    return this.dxAidsResultsService.update(+id, updateDxAidsResultDto);
  }
}
