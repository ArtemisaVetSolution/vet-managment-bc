import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDxAidsResultDto {
    @ApiProperty({ description: 'The results of the diagnostic aid', example: 'El análisis de sangre muestra niveles normales de glóbulos rojos y blancos, con una ligera elevación en las enzimas hepáticas, lo que podría sugerir estrés o una leve inflamación. Los niveles de glucosa y creatinina están dentro del rango esperado, indicando una buena función renal y metabólica.'})
    @IsString()
    @IsNotEmpty()
    result: string;

    @ApiProperty({ description: 'The date of the test', example: '2024-09-30'})
    @IsNotEmpty()
    @Transform(({ value }) => value ? new Date(value) : null)
    @IsDate()
    date: Date;

    @ApiProperty({ description: 'Id of the patient', example: 1})
    @IsNotEmpty()
    @IsNumber()
    patientId: number;

    @ApiProperty({ description: 'Id of the service', example: 1})
    @IsNotEmpty()
    @IsNumber()
    serviceId: number;
}
