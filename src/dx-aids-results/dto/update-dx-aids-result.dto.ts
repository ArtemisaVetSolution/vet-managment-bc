import { PartialType } from '@nestjs/swagger';
import { CreateDxAidsResultDto } from './create-dx-aids-result.dto';

export class UpdateDxAidsResultDto extends PartialType(CreateDxAidsResultDto) {}
