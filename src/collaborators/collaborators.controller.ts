import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CollaboratorsService } from './collaborators.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ApiDocCreateCollaborator, ApiDocDeleteCollaborator, ApiDocGetCollaborators, ApiDocGetOneCollaborator, ApiDocRestoreCollaborator, ApiDocUpdateCollaborator } from './decorators/collaborators.decorators';
import { CreatedCollaboratorResponseDto } from './dto/response-create-collaborator';
import { CollaboratorQueryDto } from './dto/collaborator-query.dto';
import { Leave, Path } from 'src/common/enums';
import { PathName, VerifyAuthService } from 'src/common/decorators/auth.decorator';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';


@ApiTags('Collaborators')
@ApiExtraModels(CreatedCollaboratorResponseDto)
@PathName(Path.COLLABORATOR)
@Controller('collaborators')
@CatchErrors()
export class CollaboratorsController {
  constructor(private readonly collaboratorsService: CollaboratorsService) {}

  @ApiDocCreateCollaborator(CreatedCollaboratorResponseDto)
  @Post()
  create(@Body() createCollaboratorDto: CreateCollaboratorDto) {
    return this.collaboratorsService.create(createCollaboratorDto);
  }

  @ApiDocGetCollaborators(CreatedCollaboratorResponseDto)
  @VerifyAuthService(Leave.CAN_READ)
  @Get()
  findWithQueryParams(@Query() query: CollaboratorQueryDto) {
    return this.collaboratorsService.findWithQueryParams(query);
  }

  @ApiDocGetOneCollaborator(CreatedCollaboratorResponseDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collaboratorsService.findOne(+id);
  }

  @ApiDocUpdateCollaborator(CreatedCollaboratorResponseDto)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollaboratorDto: UpdateCollaboratorDto) {
    return this.collaboratorsService.update(+id, updateCollaboratorDto);
  }

  @ApiDocRestoreCollaborator(CreatedCollaboratorResponseDto)
  @Patch(':id/restore')
  restore(@Param('id') id: string) {
    return this.collaboratorsService.restoreCollaborator(+id);
  }

  @ApiDocDeleteCollaborator(CreatedCollaboratorResponseDto)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collaboratorsService.remove(+id);
  }
}
