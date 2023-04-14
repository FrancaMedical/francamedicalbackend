import * as mongoose from 'mongoose';

export const addressSchema = new mongoose.Schema({
    cep: {
        type: String,
        required: true,
    },
    rua: {
        type: String,
        required: true,
    },
    numero: {
        type: String,
        required: true,
    },
    bairro: {
        type: String,
        required: true,
    },
    cidade: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
})

export const PacienteSchema = new mongoose.Schema({
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
        default: 3
    },
    endereco: [addressSchema],
    password: {
        type: String,
        required: true,
    }
})