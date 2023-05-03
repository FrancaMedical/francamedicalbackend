import { IsString, IsOptional, IsNumber } from "class-validator";
import { Document } from "mongoose";

export class CreateAdminDTO extends Document {
    @IsString()
    nome: string

    @IsString()
    email: string

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
    password: string
}