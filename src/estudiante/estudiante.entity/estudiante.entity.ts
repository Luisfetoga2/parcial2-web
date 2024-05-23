import { ProyectoEntity } from '../../proyecto/proyecto.entity/proyecto.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

    @OneToOne(() => ProyectoEntity, proyecto => proyecto.estudiante)
    @JoinColumn()
    proyecto: ProyectoEntity;
}


