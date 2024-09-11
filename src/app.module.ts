import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { PropietarioModule } from './modules/propietario.module';
import { AlmacenModule } from './modules/almacen.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Carga las variables de entorno desde un archivo .env
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [join(__dirname, '**', '*.entity.{js,ts}')],
      ssl: {
        rejectUnauthorized: false, // Cambia esto según tus necesidades de seguridad
      },
      synchronize: true, // Solo para desarrollo, en producción es mejor usar migraciones
    }),
    PropietarioModule,
    AlmacenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
