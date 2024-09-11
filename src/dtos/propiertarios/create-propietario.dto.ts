import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreatePropietarioDto {
  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsString()
  @IsNotEmpty()
  apellidos: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  tipoCuenta: string;

  @IsString()
  @IsNotEmpty()
  banco: string;

  @IsString()
  @IsNotEmpty()
  numeroCuenta: string;

  @IsString()
  foto?: string;

  @IsString()
  @IsNotEmpty()
  cedula: string;
}