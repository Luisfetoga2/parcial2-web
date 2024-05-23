import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class PropuestaService {
    constructor (
        @InjectRepository(PropuestaEntity)
        private readonly propuestaRepository: Repository<PropuestaEntity>
    ) {}

    async crearPropuesta(propuesta: PropuestaEntity): Promise<PropuestaEntity> {
        if (!propuesta.titulo)
            throw new BusinessLogicException('Titulo vacio', BusinessError.PRECONDITION_FAILED);
        return await this.propuestaRepository.save(propuesta);
    }

    async findPropuestaById(id: number): Promise<PropuestaEntity> {
        const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({where: {id}, relations: ['proyecto', 'profesor']});
        if (!propuesta)
            throw new BusinessLogicException('The propuesta with the given id was not found', BusinessError.NOT_FOUND);

        return propuesta;
    }

    async findAllPropuesta(): Promise<PropuestaEntity[]> {
        return await this.propuestaRepository.find({relations: ['proyecto', 'profesor']});
    }

    async deletePropuesta(id: number) {
        const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({where: {id}});
        if (!propuesta)
            throw new BusinessLogicException('The propuesta with the given id was not found', BusinessError.NOT_FOUND);
        if (propuesta.proyecto != null)
            throw new BusinessLogicException('La propuesta tiene proyecto asociado', BusinessError.PRECONDITION_FAILED);
        await this.propuestaRepository.remove(propuesta);
    } 
}
