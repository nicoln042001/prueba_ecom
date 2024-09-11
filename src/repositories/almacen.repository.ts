import { EntityRepository, Repository } from 'typeorm';
import { Almacen } from '../entities/almacen.entity';

@EntityRepository(Almacen)
export class AlmacenRepository extends Repository<Almacen> {}