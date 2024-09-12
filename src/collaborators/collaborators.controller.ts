import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ApiDocCreateCollaborator } from './decorators/collaborators.decorators';
import { CreatedCollaboratorResponseDto } from './dto/response-create-collaborator';

@ApiTags('Collaborators')
@ApiExtraModels(CreatedCollaboratorResponseDto)
@Controller('collaborators')
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @ApiDocCreateCollaborator(CreatedCollaboratorResponseDto)
  @Post()
  create(@Body() createCollaboratorDto: CreateCollaboratorDto) {
    return this.collaboratorsService.create(createCollaboratorDto);
  }

  @Get()
  findAll() {
    return this.collaboratorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collaboratorsService.findOne(+id);
  }

  @Get('shift/:shiftName')
  findByShift(@Param('shiftName') shiftName: string) {
    return this.collaboratorsService.findAllByShift(shiftName)
  }

  @Get('service/:serviceId')
  findByService(@Param('serviceId') serviceId: string) {
    return this.collaboratorsService.findAllByService(+serviceId)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollaboratorDto: UpdateCollaboratorDto) {
    return this.collaboratorsService.update(+id, updateCollaboratorDto);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.collaboratorsService.restoreCollaborator(+id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collaboratorsService.remove(+id);
  }
}
