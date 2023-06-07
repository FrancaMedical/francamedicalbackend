import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Consulta {
  @Prop({ required: true })
  nomePaciente: string;

  @Prop({ required: true })
  nomeMedico: string;

  @Prop({ required: true })
  especialidade: string;

  @Prop({ required: true })
  dataConsulta: string;

  @Prop({ required: true })
  horario: string;

  @Prop({ required: false })
  descricao: string;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'CreatePacienteDTO',
  })
  paciente: string[];

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'CreateMedicoDTO',
  })
  medico: string[];

  @Prop({ required: true, default: new Date() })
  createdAt: Date;

  @Prop({ required: true, default: new Date() })
  updatedAt: Date;
}

export const ConsultaSchema = SchemaFactory.createForClass(Consulta);
