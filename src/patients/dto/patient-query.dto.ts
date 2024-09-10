import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { Species } from "src/common/enums/species.enum";

export class PatientQueryDto {
    @ApiPropertyOptional({
        description: 'The specie to filter patients (Felino, Canino, Ave, Roedor, Conejo, Otro)', example: 'Felino'
    })
    @IsOptional()
    @IsEnum(Species)
    specie?: Species;

    @ApiPropertyOptional({
        description: 'The tutor ID', example: 1
    })
    @IsOptional()
    @IsNumber()
    tutorId?: number;
}