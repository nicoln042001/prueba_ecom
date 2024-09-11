import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Propietario } from '../entities/propietario.entity';
import { PropietarioService } from '../services/propietario.service';
import { PropietarioController } from '../controllers/propietario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Propietario])],
  providers: [PropietarioService],
  controllers: [PropietarioController],
  exports: [PropietarioService],
})
export class PropietarioModule {}