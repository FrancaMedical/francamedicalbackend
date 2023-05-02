import { Document } from "mongoose";
import { CreatePacienteDTO } from "../src/paciente/dto/paciente.create.dto";
import { CreateMedicoDTO } from "../src/medico/dto/medico.create.dto";

export class Consulta extends Document {
    nomePaciente: string;
    especialidade: string;
    dataConsulta: string;
    horario: string;
    descricao?: string;
    paciente: CreatePacienteDTO[];
    medico: CreateMedicoDTO[];
}