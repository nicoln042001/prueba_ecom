import { EntityRepository, Repository } from 'typeorm';
import { Propietario } from '../entities/propietario.entity';

@EntityRepository(Propietario)
export class PropietarioRepository extends Repository<Propietario> {}