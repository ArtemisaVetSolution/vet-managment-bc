import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CollaboratorQueryDto {
  @ApiPropertyOptional({
    description: 'The shift name to filter collaborators',
    example: 'Morning',
  })
  @IsOptional()
  @IsString()
  shift?: string;

  @ApiPropertyOptional({
    description: 'The service ID to filter collaborators',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  serviceId?: number;
}
