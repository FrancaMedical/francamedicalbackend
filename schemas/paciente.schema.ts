import * as mongoose from 'mongoose';
import { addressSchema } from './endereco.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateConsultaDTO } from '../src/consulta/dto/consulta.create.dto';
import { Consulta } from './consulta.schema';

export type PacienteDocument = mongoose.HydratedDocument<Paciente>

@Schema()
export class Paciente {
    @Prop({required: true})
    nome: string

    @Prop({required: true, unique: true})
    cpf: string

    @Prop({required: true})
    dataNascimento: string

    @Prop({required: true})
    tel: string
    
    @Prop({required: true, default: 3})
    role: number
    
    @Prop({required: false, type: addressSchema})
    endereco: {addressSchema}

    @Prop({required: true})
    password: string
}

export const PacienteSchema = SchemaFactory.createForClass(Paciente)