import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EstudianteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    codigo: string;

    @Column()
    creditos_aprovados: number;
}


