import { IsNotEmpty, IsString } from "class-validator";

export class PropuestaDto {

    @IsString()
    @IsNotEmpty()
    readonly titulo: string;

    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;

    @IsString()
    @IsNotEmpty()
    readonly palabra_clave: string;

}
