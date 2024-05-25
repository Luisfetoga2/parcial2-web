import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProfesorDto {

    @IsNumber()
    @IsNotEmpty()
    readonly cedula: number;

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly grupo_investigacion: string;

    @IsNumber()
    @IsNotEmpty()
    readonly numero_extension: number;
}
