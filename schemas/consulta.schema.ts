import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

@Schema()
export class Consulta {
    @Prop({required: true})
    nomePaciente: string

    @Prop({required: true})
    especialidade: string

    @Prop({required: true})
    dataConsulta: string

    @Prop({required: true})
    horario: string

    @Prop({required: false})
    descricao: string

    @Prop({required: true, type: mongoose.Types.ObjectId, ref: 'CreatePacienteDTO'})
    paciente: string[]

    @Prop({required: true, type: mongoose.Types.ObjectId, ref: 'CreateMedicoDTO'})
    medico: string[]
}

export const ConsultaSchema = SchemaFactory.createForClass(Consulta)

