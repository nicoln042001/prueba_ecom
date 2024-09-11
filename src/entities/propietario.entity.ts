import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Almacen } from './almacen.entity';

@Entity()
export class Propietario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column()
  direccion: string;

  @Column()
  correo: string;

  @Column()
  telefono: string;

  @Column()
  tipoCuenta: string;

  @Column()
  banco: string;

  @Column()
  numeroCuenta: string;

  @Column({ nullable: true })
  foto?: string;

  @Column({ unique: true })
  cedula: string;

  @OneToMany(() => Almacen, almacen => almacen.propietario)
  almacenes: Almacen[];
}
