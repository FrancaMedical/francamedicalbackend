import { Document } from "mongoose";

export class Medico extends Document {
    nome: string;
    tel: number;
    cpf: string;
    role: number;
    dataNascimento: string;
    endereco: string[];
    crm: string;
    password: string;
    especialidade: string
}