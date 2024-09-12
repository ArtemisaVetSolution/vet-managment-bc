import { ApiProperty } from '@nestjs/swagger';

class ShiftDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Morning' })
  name: string;

  @ApiProperty({ example: '08:00' })
  startTime: string;

  @ApiProperty({ example: '16:00' })
  endTime: string;
}

class ServiceDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Consulta general' })
  name: string;

  @ApiProperty({ example: 50000 })
  price: number;
}

export class CreatedCollaboratorResponseDto {
  @ApiProperty({ example: 'b9e12ea9-83e2-4b42-b4a5-7fb02855a4e2' })
  userId: string;

  @ApiProperty({ type: ShiftDto })
  shift: ShiftDto;

  @ApiProperty({ type: [ServiceDto] })
  services: ServiceDto[];

  @ApiProperty({ example: 7 })
  id: number;

  @ApiProperty({ example: '2024-09-12T00:15:36.045Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-09-12T00:15:36.045Z' })
  updatedAt: string;

  @ApiProperty({ example: null, nullable: true })
  deletedAt: string | null;
}