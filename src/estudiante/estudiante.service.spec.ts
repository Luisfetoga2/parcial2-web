import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { EstudianteService } from './estudiante.service';

import { faker } from '@faker-js/faker';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;
  let estudiantesList: EstudianteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    estudiantesList = [];
    for(let i = 0; i < 5; i++){
        const estudiante: EstudianteEntity = await repository.save({
        nombre: faker.word.sample(),
        codigo: faker.word.sample(),
        creditos_aprovados: faker.number.int(),
        })
        estudiantesList.push(estudiante);
    }
  }
    
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findEstudianteById should return a estudiante by id', async () => {
    const storedEstudiante: EstudianteEntity = estudiantesList[0];
    const estudiante: EstudianteEntity = await service.findEstudianteById(storedEstudiante.id);
    expect(estudiante).not.toBeNull();
    expect(estudiante.nombre).toEqual(storedEstudiante.nombre)
    expect(estudiante.codigo).toEqual(storedEstudiante.codigo)
    expect(estudiante.creditos_aprovados).toEqual(storedEstudiante.creditos_aprovados)
  });

  it('findEstudianteById should throw an exception for an invalid estudiante', async () => {
    await expect(() => service.findEstudianteById(0)).rejects.toHaveProperty("message", "The estudiante with the given id was not found")
  });

  it('crearEstudiante should return a new estudiante', async () => {
    const estudiante: EstudianteEntity = {
      id: 0,
      nombre: faker.word.sample(),
      codigo: faker.word.sample(10),
      creditos_aprovados: faker.number.int(),
      proyecto: null,
    }

    const newEstudiante: EstudianteEntity = await service.crearEstudiante(estudiante);
    expect(newEstudiante).not.toBeNull();

    const storedEstudiante: EstudianteEntity = await repository.findOne({where: {id: newEstudiante.id}})
    expect(storedEstudiante).not.toBeNull();
    expect(estudiante.nombre).toEqual(storedEstudiante.nombre)
    expect(estudiante.codigo).toEqual(storedEstudiante.codigo)
    expect(estudiante.creditos_aprovados).toEqual(storedEstudiante.creditos_aprovados)
  });

  it('crearEstudiante should throw an exception for invalid codigo', async () => {
    let cod = faker.word.sample();
    while (cod.length == 10) {
      cod = faker.word.sample();
    }
    
    const estudiante: EstudianteEntity = {
      id: 0,
      nombre: faker.word.sample(),
      codigo: cod,
      creditos_aprovados: faker.number.int(),
      proyecto: null,
    }

    await expect(() => service.crearEstudiante(estudiante)).rejects.toHaveProperty("message", "El codigo debe tener 10 caracteres")
  });
});