import { CreateMedicoDTO } from "./medico.create.dto";

export class ReturnMedicoDTO {
    constructor(medico: CreateMedicoDTO){
        this.nome = medico.nome,
        this.tel = medico.tel,
        this.cpf = medico.cpf,
        this.dataNascimento = medico.dataNascimento,
        this.endereco = medico.endereco
    }

    nome: string;
    tel: string;
    cpf: string;
    dataNascimento: string;
    endereco: string[];
}