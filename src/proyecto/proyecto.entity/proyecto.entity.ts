import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProyectoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fechaInicio: Date;

    @Column()
    fechaFin: Date;

    @Column()
    url: string;
}
