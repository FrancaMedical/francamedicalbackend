import * as mongoose from 'mongoose';
import { addressSchema } from './endereco.schema';

export const MedicoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    dataNascimento: {
        type: String,
        required: true,
    },
    tel: {
        type: Number,
        required: true,
    },
    role: {
        type: Number,
        required: true,
        default: 2
    },
    crm: {
        type: String,
        required: true,
        unique: true
    },
    especialidade: {
        type: String,
        required: true,
    },
    endereco: [addressSchema],
    password: {
        type: String,
        required: true,
    }
})