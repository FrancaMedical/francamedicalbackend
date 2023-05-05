import { addressSchema } from './endereco.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

    @Prop({required: true, default: new Date()})
    createdAt: Date

    @Prop({required: true, default: new Date()})
    updatedAt: Date
}

export const PacienteSchema = SchemaFactory.createForClass(Paciente)