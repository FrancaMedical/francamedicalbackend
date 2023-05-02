import { addressSchema } from './endereco.schema';
import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type MedicoDocument = mongoose.HydratedDocument<Medico>

@Schema()
export class Medico {
    @Prop({required: true})
    nome: string

    @Prop({required: true, unique: true})
    cpf: string

    @Prop({required: true})
    dataNascimento: string

    @Prop({required: true})
    tel: string

    @Prop({required: true, default: 2})
    role: number

    @Prop({required: true, unique: true})
    crm: string

    @Prop({required: true})
    especialidade: string

    @Prop({required: false, type: addressSchema})
    endereco: {addressSchema}

    @Prop({required: true})
    password: string
}

export const MedicoSchema = SchemaFactory.createForClass(Medico)