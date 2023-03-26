import { Document } from "mongoose";

export class Consulta extends Document {
    nomePaciente: string;
    especialidade: string;
    dataConsulta: string;
    horario: string;
    descricao: string;
}