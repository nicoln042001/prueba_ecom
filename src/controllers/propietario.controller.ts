import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, UseInterceptors, UploadedFile, NotFoundException } from '@nestjs/common';
import { PropietarioService } from '../services/propietario.service';
import { CreatePropietarioDto } from '../dtos/propiertarios/create-propietario.dto';
import { UpdatePropietarioDto } from '../dtos/propiertarios/update-propietario.dto';
import { Propietario } from '../entities/propietario.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { File } from 'multer';

@Controller('propietarios')
export class PropietarioController {
  constructor(private readonly propietarioService: PropietarioService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: './uploads/fotos',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create(
    @Body() createPropietarioDto: CreatePropietarioDto,
    @UploadedFile() file: File,
  ): Promise<Propietario> {
    // Guardar la ruta de la foto en el DTO antes de pasarla al servicio
    if (file) {
      createPropietarioDto.foto = `/uploads/fotos/${file.filename}`;
    }
    return this.propietarioService.create(createPropietarioDto);
  }

  @Get()
  async findAll(): Promise<Propietario[]> {
    return this.propietarioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Propietario> {
    return this.propietarioService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: './uploads/fotos',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePropietarioDto: UpdatePropietarioDto,
    @UploadedFile() file: File,
  ): Promise<Propietario> {
    if (file) {
      updatePropietarioDto.foto = `/uploads/fotos/${file.filename}`;
    }
    return this.propietarioService.update(id, updatePropietarioDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.propietarioService.remove(id);
  }
}