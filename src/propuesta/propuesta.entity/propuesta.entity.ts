import { ProfesorEntity } from '../../profesor/profesor.entity/profesor.entity';
import { ProyectoEntity } from '../../proyecto/proyecto.entity/proyecto.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PropuestaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    descripcion: string;

    @Column()
    palabra_clave: string;
    
    @OneToOne(() => ProyectoEntity, proyecto => proyecto.propuesta)
    @JoinColumn()
    proyecto: ProyectoEntity;

    @ManyToOne(() => ProfesorEntity, profesor => profesor.propuestas)
    profesor: ProfesorEntity;
}
