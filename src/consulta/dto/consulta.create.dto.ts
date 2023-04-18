import { IsString, IsOptional } from "class-validator";
import { Document } from "mongoose";

export class CreateConsultaDTO extends Document {
    @IsString()
    nomePaciente: string;

    @IsString()
    especialidade: string;
    
    @IsString()
    dataConsulta: string;

    @IsString()
    horario: string;

    @IsString()
    @IsOptional()
    descricao: string;
}