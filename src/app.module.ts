import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProyectoModule } from './proyecto/proyecto.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { ProfesorModule } from './profesor/profesor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto/proyecto.entity/proyecto.entity';
import { EstudianteEntity } from './estudiante/estudiante.entity/estudiante.entity';
import { PropuestaEntity } from './propuesta/propuesta.entity/propuesta.entity';
import { ProfesorEntity } from './profesor/profesor.entity/profesor.entity';

@Module({
  imports: [ProyectoModule, EstudianteModule, PropuestaModule, ProfesorModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'parcial',
      entities: [ProyectoEntity, EstudianteEntity, PropuestaEntity, ProfesorEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
