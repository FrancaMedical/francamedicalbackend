import { Document } from "mongoose";

export class Admin extends Document {
    nome: string;
    email: string;
    tel: string;
    cpf: string;
    role: number;
    dataNascimento: string;
    endereco: string[];
    password: string;
}