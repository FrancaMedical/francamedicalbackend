import { Document } from "mongoose";

export class Paciente extends Document {
    nome: string;
    email: string;
    tel: number;
    cpf: string;
}