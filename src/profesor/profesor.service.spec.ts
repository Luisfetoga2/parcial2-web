import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { ProfesorService } from './profesor.service';

import { faker } from '@faker-js/faker';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let repository: Repository<ProfesorEntity>;
  let profesorsList: ProfesorEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProfesorService],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    repository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    profesorsList = [];
    const grupos: Array<string> = ['TICSW', 'IMAGINE', 'COMIT']
    for(let i = 0; i < 5; i++){
        const grupo: string = grupos[Math.floor(Math.random() * grupos.length)]
        const profesor: ProfesorEntity = await repository.save({
        cedula: faker.number.int(),
        nombre: faker.word.sample(),
        grupo_investigacion: grupo,
        numero_extension: faker.number.int(),
        propuestas: []
        })
        profesorsList.push(profesor);
    }
  }
    
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findProfesorById should return a profesor by id', async () => {
    const storedProfesor: ProfesorEntity = profesorsList[0];
    const profesor: ProfesorEntity = await service.findProfesorById(storedProfesor.id);
    expect(profesor).not.toBeNull();
    expect(profesor.cedula).toEqual(storedProfesor.cedula)
    expect(profesor.nombre).toEqual(storedProfesor.nombre)
    expect(profesor.grupo_investigacion).toEqual(storedProfesor.grupo_investigacion)
    expect(profesor.numero_extension).toEqual(storedProfesor.numero_extension)
  });

  it('findProfesorById should throw an exception for an invalid profesor', async () => {
    await expect(() => service.findProfesorById(0)).rejects.toHaveProperty("message", "The profesor with the given id was not found")
  });

  it('crearProfesor should return a new profesor', async () => {
    // Seleccionar un grupo aleatorio valido
    const grupos: Array<string> = ['TICSW', 'IMAGINE', 'COMIT']
    const grupo: string = grupos[Math.floor(Math.random() * grupos.length)]

    const profesor: ProfesorEntity = {
      id: 0,
      cedula: faker.number.int(),
      nombre: faker.word.sample(),
      grupo_investigacion: grupo,
      numero_extension: faker.number.int(),
      propuestas: [],
    }

    const newProfesor: ProfesorEntity = await service.crearProfesor(profesor);
    expect(newProfesor).not.toBeNull();

    const storedProfesor: ProfesorEntity = await repository.findOne({where: {id: newProfesor.id}})
    expect(storedProfesor).not.toBeNull();
    expect(profesor.cedula).toEqual(storedProfesor.cedula)
    expect(profesor.nombre).toEqual(storedProfesor.nombre)
    expect(profesor.grupo_investigacion).toEqual(storedProfesor.grupo_investigacion)
    expect(profesor.numero_extension).toEqual(storedProfesor.numero_extension)
  });

  it('crearProfesor should throw an exception for an invalid profesor', async () => {
    const profesor: ProfesorEntity = profesorsList[0];
    profesor.grupo_investigacion = 'INVALID_GROUP';
    await expect(() => service.crearProfesor(profesor)).rejects.toHaveProperty("message", "Grupo de investigacion invalido")
  });

  it('eliminarProfesorId should remove a profesor by id', async () => {
    const profesor: ProfesorEntity = profesorsList[0];
    await service.eliminarProfesorId(profesor.id);
  
    const deletedProfesor: ProfesorEntity = await repository.findOne({ where: { id: profesor.id } })
    expect(deletedProfesor).toBeNull();
  });

  it('eliminarProfesorId should throw an exception for an invalid profesor', async () => {
    await expect(() => service.eliminarProfesorId(0)).rejects.toHaveProperty("message", "The profesor with the given id was not found")
  });

  it('eliminarProfesorCedula should remove a profesor by cedula', async () => {
    const profesor: ProfesorEntity = profesorsList[0];
    await service.eliminarProfesorCedula(profesor.cedula);
  
    const deletedProfesor: ProfesorEntity = await repository.findOne({ where: { cedula: profesor.cedula } })
    expect(deletedProfesor).toBeNull();
  });

  it('eliminarProfesorCedula should throw an exception for an invalid profesor', async () => {
    await expect(() => service.eliminarProfesorCedula(0)).rejects.toHaveProperty("message", "The profesor with the given id was not found")
  });
 
});