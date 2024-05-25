import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ProyectoService {
    constructor (
        @InjectRepository(ProyectoEntity)
        private readonly proyectoRepository: Repository<ProyectoEntity>
    ) {}

    async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
        if (proyecto.fechaFin <= proyecto.fechaInicio)
            throw new BusinessLogicException('La fecha de fin debe ser posterior a la fecha de inicio', BusinessError.PRECONDITION_FAILED);
        return await this.proyectoRepository.save(proyecto);
    }
}
