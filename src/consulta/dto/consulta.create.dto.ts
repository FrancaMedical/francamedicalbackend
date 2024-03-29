import { IsString, IsOptional } from 'class-validator';
import { Document, Schema } from 'mongoose';

export class CreateConsultaDTO extends Document {
  @IsString()
  nomePaciente: string;

  @IsString()
  nomeMedico: string;

  @IsString()
  especialidade: string;

  @IsString()
  dataConsulta: string;

  @IsString()
  horario: string;

  @IsString()
  @IsOptional()
  descricao: string;

  @IsString()
  paciente: Schema.Types.ObjectId | any;

  @IsString()
  medico: Schema.Types.ObjectId | any;
}
