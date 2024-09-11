import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Almacen } from '../entities/almacen.entity';
import { CreateAlmacenDto } from 'src/dtos/almacenes/create-almacen.dto';
import { UpdateAlmacenDto } from 'src/dtos/almacenes/update-almacen.dto';
import { Propietario } from 'src/entities/propietario.entity';

@Injectable()
export class AlmacenService {
    constructor(
        @InjectRepository(Almacen)
        private readonly AlmacenRepository: Repository<Almacen>,
      ) {}
    
      async create(createAlmacenDto: CreateAlmacenDto): Promise<Almacen> {
        try {
          const almacen = this.AlmacenRepository.create(createAlmacenDto);
          return await this.AlmacenRepository.save(almacen);
        } catch (error) {
          console.error('Error al crear el almacén:', error);
          throw new InternalServerErrorException('No se pudo crear el almacén', error);
        }
      }
    
      // Obtener todos los Almacens
      async findAll(): Promise<Almacen[]> {
        return this.AlmacenRepository.find({relations: ['propietario']});
      }
    
      // Obtener un Almacen por ID
      async findOne(id: number): Promise<Almacen> {
        const Almacen = await this.AlmacenRepository.findOne({
          where:{ id },
          relations: ['propietario']});
        if (!Almacen) {
          throw new NotFoundException(`Almacen con ID ${id} no encontrado`);
        }
        return Almacen;
      }
    
      // Actualizar un Almacen
      async update(id: number, updateAlmacenDto: UpdateAlmacenDto): Promise<Almacen> {
        const Almacen = await this.AlmacenRepository.preload({
          id,
          ...updateAlmacenDto,
        });
        if (!Almacen) {
          throw new NotFoundException(`Almacen con ID ${id} no encontrado`);
        }
        return this.AlmacenRepository.save(Almacen);
      }
    
      // Eliminar un Almacen
      async remove(id: number): Promise<void> {
        const result = await this.AlmacenRepository.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException(`Almacen con ID ${id} no encontrado`);
        }
      }
}