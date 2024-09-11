import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Almacen } from '../entities/almacen.entity';
import { AlmacenService } from '../services/almacen.service';
import { AlmacenController } from '../controllers/almacen.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Almacen])],
  providers: [AlmacenService],
  controllers: [AlmacenController],
  exports: [AlmacenService],
})
export class AlmacenModule {}