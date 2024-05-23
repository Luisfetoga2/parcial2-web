import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class ProfesorService {
    constructor (
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>
    ) {}

    async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
        const grupos: Array<string> = ['TICSW', 'IMAGINE', 'COMIT']
        if (!grupos.includes(profesor.grupo_investigacion))
            throw new BusinessLogicException('Grupo de investigacion invalido', BusinessError.PRECONDITION_FAILED);
        return await this.profesorRepository.save(profesor);
    }

    async findProfesorById(id: number): Promise<ProfesorEntity> {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where: {id}, relations: ['propuestas']});
        if (!profesor)
            throw new BusinessLogicException('The profesor with the given id was not found', BusinessError.NOT_FOUND);

        return profesor;
    }

    async eliminarProfesorId(id: number) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where: {id}});
        if (!profesor)
            throw new BusinessLogicException('The profesor with the given id was not found', BusinessError.NOT_FOUND);
        profesor.propuestas.forEach(function (propuesta) {
            if (propuesta.proyecto != null)
                throw new BusinessLogicException('El profesor tiene una propuesta con proyecto asociado', BusinessError.PRECONDITION_FAILED);
        });

        await this.profesorRepository.remove(profesor);
    }

    async eliminarProfesorCedula(cedula_: number) {
        const profesor: ProfesorEntity = await this.profesorRepository.findOne({where: {cedula: cedula_}});
        if (!profesor)
            throw new BusinessLogicException('The profesor with the given id was not found', BusinessError.NOT_FOUND);
        profesor.propuestas.forEach(function (propuesta) {
            if (propuesta.proyecto != null)
                throw new BusinessLogicException('El profesor tiene una propuesta con proyecto asociado', BusinessError.PRECONDITION_FAILED);
        });

        await this.profesorRepository.remove(profesor);
    }
}
