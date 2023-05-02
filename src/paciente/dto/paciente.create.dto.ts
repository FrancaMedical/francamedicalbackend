import { IsString, IsNumber, IsOptional, MinLength, MaxLength } from "class-validator";
import { Document } from "mongoose";

export class CreatePacienteDTO extends Document {
    @IsString()
    nome: string

    @IsNumber()
    tel: string

    @IsString()
    cpf: string

    @IsString()
    dataNascimento: string

    @IsNumber()
    role: number

    @IsOptional()
    @IsString()
    endereco: string[]

    @IsString()
    @MinLength(6)
    @MaxLength(12)
    password: string
}