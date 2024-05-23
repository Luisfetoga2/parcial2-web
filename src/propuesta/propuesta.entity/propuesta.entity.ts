import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
