import * as mongoose from 'mongoose';
import { addressSchema } from './endereco.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PacienteDocument = mongoose.HydratedDocument<Paciente>

@Schema()
export class Paciente {
    @Prop({required: true})
    nome: string

    @Prop({required: true})
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