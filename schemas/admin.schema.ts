import { addressSchema } from './endereco.schema';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Admin {
    @Prop({required: true})
    nome: string

    @Prop({required: true, unique: true})
    email: string

    @Prop({required: true, unique: true})
    cpf: string

    @Prop({required: true})
    dataNascimento: string

    @Prop({required: true})
    tel: string

    @Prop({required: true, default: 1})
    role: number

    @Prop({required: false, type: addressSchema})
    endereco: {addressSchema}

    @Prop({required: true})
    password: string
}

export const AdminSchema = SchemaFactory.createForClass(Admin)