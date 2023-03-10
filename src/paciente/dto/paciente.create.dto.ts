import { IsString, IsNumber } from "class-validator";
import { Document } from "mongoose";

export class CreatePacienteDTO extends Document {
    @IsString()
    nome: string

    @IsString()
    email: string

    @IsNumber()
    tel: number

    @IsString()
    cpf: string
}