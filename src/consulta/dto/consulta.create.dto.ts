import { IsString, IsDateString, IsOptional } from "class-validator";
import { Document } from "mongoose";

export class CreateConsultaDTO extends Document {
    @IsString()
    nomePaciente: string;

    @IsString()
    especialidade: string;
    
    @IsDateString()
    dataConsulta: string;

    @IsDateString()
    horario: string;

    @IsString()
    @IsOptional()
    descricao: string;
}