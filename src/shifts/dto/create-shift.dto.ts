import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateShiftDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'startTime must be in the format HH:mm (24-hour format)',
  })
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'endTime must be in the format HH:mm (24-hour format)',
  })
  @IsNotEmpty()
  endTime: string;
}
