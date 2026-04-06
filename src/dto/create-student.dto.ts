import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateStudentDto {

  @IsString()
  @IsNotEmpty()
  documento: string;

  @IsNumber()
  edad: number;

  @IsString()
  telefono: string;

  @IsNumber()
  userId: number;
}