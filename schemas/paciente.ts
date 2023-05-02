import { Document } from "mongoose";

export class Paciente extends Document {
    nome: string;
    tel: string;
    cpf: string;
    role: number;
    dataNascimento: string;
    endereco: string[];
    password: string
}