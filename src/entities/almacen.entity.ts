import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Propietario } from './propietario.entity';

@Entity()
export class Almacen {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Propietario, propietario => propietario.almacenes)
  propietario: Propietario;

  @Column()
  producto: string;

  @Column({ type: 'float' })
  cantidad: number;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @Column()
  cuentaBancaria: string;

  @Column()
  nombreLugar: string;

  @Column({ unique: true })
  nit: string;
  
}
