import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Propietario } from '../entities/propietario.entity';
import { CreatePropietarioDto } from '../dtos/propiertarios/create-propietario.dto';
import { UpdatePropietarioDto } from '../dtos/propiertarios/update-propietario.dto';

@Injectable()
export class PropietarioService {
    constructor(
        @InjectRepository(Propietario)
        private readonly propietarioRepository: Repository<Propietario>,
      ) {}
    
      // Crear un nuevo propietario
      async create(createPropietarioDto: CreatePropietarioDto): Promise<Propietario> {
        const propietarioExistente = await this.propietarioRepository.findOne({ 
            where: [{ cedula: createPropietarioDto.cedula }, { correo: createPropietarioDto.correo }, { telefono: createPropietarioDto.telefono }] 
          });
          
          if (propietarioExistente) {
            throw new BadRequestException('El propietario ya existe con la misma cédula o teléfono.');
          }
          const propietario = this.propietarioRepository.create(createPropietarioDto);
          return this.propietarioRepository.save(propietario);
        }
    
      // Obtener todos los propietarios
      async findAll(): Promise<Propietario[]> {
        return this.propietarioRepository.find();
      }
    
      // Obtener un propietario por ID
      async findOne(id: number): Promise<Propietario> {
        const propietario = await this.propietarioRepository.findOneBy({ id });
        if (!propietario) {
          throw new NotFoundException(`Propietario con ID ${id} no encontrado`);
        }
        return propietario;
      }
    
      // Actualizar un propietario
      async update(id: number, updatePropietarioDto: UpdatePropietarioDto): Promise<Propietario> {
        const { cedula, ...updateData } = updatePropietarioDto; // Desestructuración para excluir cedula
    
        const propietario = await this.propietarioRepository.preload({
            id,
            ...updateData, // Usar el objeto sin cedula
        });
        
        if (!propietario) {
            throw new NotFoundException(`Propietario con ID ${id} no encontrado`);
        }
        
        return this.propietarioRepository.save(propietario);
    }
    
      // Eliminar un propietario
      async remove(id: number): Promise<void> {
        const result = await this.propietarioRepository.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException(`Propietario con ID ${id} no encontrado`);
        }
      }
}