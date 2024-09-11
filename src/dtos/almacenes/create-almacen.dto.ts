import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateAlmacenDto {
  @IsString()
  @IsNotEmpty()
  producto: string;

  @IsNumber()
  @IsNotEmpty()
  cantidad: number;

  @IsNumber()
  @IsNotEmpty()
  propietarioId: number;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  cuentaBancaria: string;

  @IsString()
  @IsNotEmpty()
  nombreLugar: string;

  @IsString()
  @IsNotEmpty()
  nit: string;
}