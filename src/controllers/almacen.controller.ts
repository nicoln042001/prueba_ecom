import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { AlmacenService } from '../services/almacen.service';
import { CreateAlmacenDto } from '../dtos/almacenes/create-almacen.dto';
import { UpdateAlmacenDto } from '../dtos/almacenes/update-almacen.dto';
import { Almacen } from '../entities/almacen.entity';

@Controller('almacenes')
export class AlmacenController {
  constructor(private readonly almacenService: AlmacenService) {}

  @Post()
  async create(@Body() createAlmacenDto: CreateAlmacenDto): Promise<Almacen> {
      return this.almacenService.create(createAlmacenDto);
  }

  @Get()
  async findAll(): Promise<Almacen[]> {
    return this.almacenService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Almacen> {
    return this.almacenService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlmacenDto: UpdateAlmacenDto,
  ): Promise<Almacen> {
    return this.almacenService.update(id, updateAlmacenDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.almacenService.remove(id);
  }
}