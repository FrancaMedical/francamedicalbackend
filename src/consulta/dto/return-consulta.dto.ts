import { ReturnMedicoDTO } from "../../medico/dto/return-medico.dto";
import { ReturnPacienteDTO } from "../../paciente/dto/return-paciente.dto";
import { CreateConsultaDTO } from "./consulta.create.dto";

export class ReturnConsultaDTO {
    constructor(consulta: CreateConsultaDTO){
        this.id = consulta.id;
        this.nomePaciente = consulta.nomePaciente;
        this.especialidade = consulta.especialidade;
        this.dataConsulta = consulta.dataConsulta;
        this.horario = consulta.horario;
        this.descricao = consulta.descricao;

        this.paciente = consulta.paciente
        ? new ReturnPacienteDTO(consulta.paciente) : undefined

        this.medico = consulta.medico ? new ReturnMedicoDTO(consulta.medico) : undefined
    }
    id: string;
    nomePaciente: string;
    especialidade: string;
    dataConsulta: string;
    horario: string;
    descricao?: string;
    paciente: ReturnPacienteDTO;
    medico: ReturnMedicoDTO;
}