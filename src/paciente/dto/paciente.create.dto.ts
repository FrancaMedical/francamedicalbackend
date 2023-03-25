import { IsString, IsNumber, IsDateString } from "class-validator";
import { Document } from "mongoose";

export class CreatePacienteDTO extends Document {
    @IsString()
    nome: string

    @IsNumber()
    tel: number

    @IsString()
    cpf: string

    @IsDateString()
    dataNascimento: string

    @IsNumber()
    role: number

    @IsString()
    endereco: string[]
}