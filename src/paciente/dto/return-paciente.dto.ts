import { CreatePacienteDTO } from "./paciente.create.dto";

export class ReturnPacienteDTO {
    constructor(paciente: CreatePacienteDTO){
        this.nome = paciente.nome,
        this.tel = paciente.tel,
        this.cpf = paciente.cpf,
        this.dataNascimento = paciente.dataNascimento,
        this.endereco = paciente.endereco
    }

    nome: string;
    tel: string;
    cpf: string;
    dataNascimento: string;
    endereco: string[];
}