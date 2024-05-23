import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProfesorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cedula: number;

    @Column()
    nombre: string;

    @Column()
    grupo_investigacion: string;

    @Column()
    numero_extension: number;
}
